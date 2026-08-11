import { notFound } from 'next/navigation';
import { buildVacancyWhere, findVacancies } from '../../../lib/vacancy-query.js';
import { getCategory } from '../../../lib/categories.js';
import VacancyCard from '../../../components/VacancyCard';
import VacancyFilters from '../../../components/VacancyFilters';

export const dynamic = 'force-dynamic';

export default async function CategoryVacanciesPage({ params, searchParams }) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const where = buildVacancyWhere({ ...searchParams, category: category.id });
  const vacancies = await findVacancies(where, { take: 60 });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">
        {category.icon} {category.label}
      </h1>
      <VacancyFilters lockCategory />
      <p className="mt-4 text-sm text-gray-500">Найдено: {vacancies.length}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {vacancies.map((v) => (
          <VacancyCard key={v.id} vacancy={v} />
        ))}
      </div>
      {vacancies.length === 0 && (
        <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-gray-500">
          В этой категории пока нет вакансий. Запустите <code>npm run ingest</code>.
        </p>
      )}
    </div>
  );
}
