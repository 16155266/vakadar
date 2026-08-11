// Дев-утилита: наполняет БД несколькими тестовыми вакансиями, чтобы проверить
// интерфейс без реального сбора из HH/Telegram (например, если HH API временно
// недоступен из вашей сети — их антибот-защита иногда блокирует дата-центровые IP).
import { PrismaClient } from '@prisma/client';
import { CATEGORIES } from '../lib/categories.js';

const prisma = new PrismaClient();

const SAMPLE = [
  { categoryId: 'backend', title: 'Backend-разработчик (Python)', company: 'ООО Пример', salaryMin: 250000, salaryMax: 350000, location: 'Москва', remote: true },
  { categoryId: 'frontend', title: 'Frontend-разработчик (React)', company: 'Тест Технологии', salaryMin: 200000, salaryMax: 280000, location: 'Санкт-Петербург', remote: true },
  { categoryId: 'devops', title: 'DevOps-инженер', company: 'Демо Cloud', salaryMin: 300000, salaryMax: 400000, location: 'Удалённо', remote: true },
  { categoryId: 'data-ml', title: 'ML-инженер', company: 'Sample AI', salaryMin: 280000, salaryMax: 420000, location: 'Москва', remote: false },
  { categoryId: 'qa', title: 'QA Automation Engineer', company: 'Example QA', salaryMin: 180000, salaryMax: 230000, location: 'Казань', remote: true },
  { categoryId: 'design', title: 'Продуктовый дизайнер', company: 'Демо Студия', salaryMin: 170000, salaryMax: 220000, location: 'Москва', remote: false },
];

async function main() {
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: { label: cat.label, icon: cat.icon },
      create: { id: cat.id, label: cat.label, icon: cat.icon },
    });
  }

  for (const [i, v] of SAMPLE.entries()) {
    await prisma.vacancy.upsert({
      where: { source_externalId: { source: 'sample', externalId: String(i) } },
      update: v,
      create: { ...v, source: 'sample', externalId: String(i), currency: 'RUB', applyUrl: 'https://example.com' },
    });
  }

  console.log(`Готово. Тестовых вакансий: ${SAMPLE.length}`);
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
