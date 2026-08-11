import { buildVacancyWhere, findVacancies } from '../../lib/vacancy-query.js';
import VacancyCard from '../../components/VacancyCard';
import VacancyFilters from '../../components/VacancyFilters';

export const dynamic = 'force-dynamic';

export default async function VacanciesPage({ searchParams }) {
  const where = buildVacancyWhere(searchParams);
  const vacancies = await findVacancies(where, { take: 60 });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Все вакансии</h1>
      <VacancyFilters />
      <p className="mt-4 text-sm text-gray-500">Найдено: {vacancies.length}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {vacancies.map((v) => (
          <VacancyCard key={v.id} vacancy={v} />
        ))}
      </div>
      {vacancies.length === 0 && (
        <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-gray-500">
          Ничего не найдено. Попробуйте изменить фильтры или запустить <code>npm run ingest</code>.
        </p>
      )}
    </div>
  );
}
