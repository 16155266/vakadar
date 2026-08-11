// Тянет вакансии из публичного HH.ru API по запросам из lib/categories.js
// и складывает их в БД (upsert по [source, externalId]).
import { PrismaClient } from '@prisma/client';
import { CATEGORIES } from '../lib/categories.js';

const prisma = new PrismaClient();
const HH_AREA_RUSSIA = '113';

async function ensureCategories() {
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: { label: cat.label, icon: cat.icon },
      create: { id: cat.id, label: cat.label, icon: cat.icon },
    });
  }
}

async function fetchVacanciesForCategory(category) {
  const url = new URL('https://api.hh.ru/vacancies');
  url.searchParams.set('text', category.query);
  url.searchParams.set('area', HH_AREA_RUSSIA);
  url.searchParams.set('per_page', '50');
  url.searchParams.set('order_by', 'publication_time');

  const resp = await fetch(url, {
    headers: { 'User-Agent': 'Vakadar/0.1 (personal project)' },
  });
  if (!resp.ok) {
    console.error(`  HH API ${resp.status} для категории ${category.id}`);
    return [];
  }
  const data = await resp.json();
  return data.items || [];
}

function normalizeSalary(salary) {
  if (!salary) return { salaryMin: null, salaryMax: null, currency: null };
  return {
    salaryMin: salary.from ?? null,
    salaryMax: salary.to ?? null,
    currency: salary.currency ?? null,
  };
}

async function main() {
  console.log('Синхронизация категорий...');
  await ensureCategories();

  let totalUpserted = 0;

  for (const category of CATEGORIES) {
    console.log(`Категория: ${category.label} (${category.id})`);
    const items = await fetchVacanciesForCategory(category);
    console.log(`  Найдено вакансий: ${items.length}`);

    for (const item of items) {
      const { salaryMin, salaryMax, currency } = normalizeSalary(item.salary);
      const remote = /удал[её]нн/i.test(item.schedule?.name || '') ||
        /удал[её]нн/i.test(item.name || '');

      await prisma.vacancy.upsert({
        where: { source_externalId: { source: 'hh', externalId: item.id } },
        update: {
          title: item.name,
          company: item.employer?.name || null,
          categoryId: category.id,
          location: item.area?.name || null,
          salaryMin,
          salaryMax,
          currency,
          remote,
          description: item.snippet?.requirement || item.snippet?.responsibility || null,
          applyUrl: item.alternate_url,
          publishedAt: item.published_at ? new Date(item.published_at) : new Date(),
        },
        create: {
          source: 'hh',
          externalId: item.id,
          title: item.name,
          company: item.employer?.name || null,
          categoryId: category.id,
          location: item.area?.name || null,
          salaryMin,
          salaryMax,
          currency,
          remote,
          description: item.snippet?.requirement || item.snippet?.responsibility || null,
          applyUrl: item.alternate_url,
          publishedAt: item.published_at ? new Date(item.published_at) : new Date(),
        },
      });
      totalUpserted += 1;
    }

    // Не долбим HH API слишком часто подряд
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`Готово. Обработано вакансий: ${totalUpserted}`);
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
