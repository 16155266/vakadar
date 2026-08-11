import Link from 'next/link';
import { prisma } from '../lib/prisma';
import { CATEGORIES } from '../lib/categories.js';
import VacancyCard from '../components/VacancyCard';

async function getLatestVacancies() {
  return prisma.vacancy.findMany({
    orderBy: { publishedAt: 'desc' },
    take: 6,
  });
}

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const latest = await getLatestVacancies();

  return (
    <div>
      <section className="rounded-2xl bg-brand-500 px-8 py-16 text-center text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">Вакадар — умный радар IT-вакансий</h1>
        <p className="mx-auto mt-4 max-w-xl text-brand-50">
          Собираем вакансии из HH.ru и Telegram-каналов, отфильтровываем нерелевантное
          и показываем только то, что подходит вашей специализации.
        </p>
        <Link
          href="/vacancies"
          className="mt-6 inline-block rounded-md bg-white px-6 py-2.5 font-medium text-brand-700 hover:bg-brand-50"
        >
          Смотреть вакансии
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Категории</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/vacancies/${cat.id}`}
              className="flex items-center gap-2 rounded-lg border bg-white p-3 text-sm hover:border-brand-400"
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Последние вакансии</h2>
          <Link href="/vacancies" className="text-sm text-brand-600 hover:underline">
            Все вакансии →
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-gray-500">
            Пока пусто — запустите <code className="rounded bg-gray-100 px-1">npm run ingest</code>,
            чтобы наполнить каталог вакансиями из HH.ru и Telegram.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((v) => (
              <VacancyCard key={v.id} vacancy={v} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
