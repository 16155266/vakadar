import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '../../../lib/prisma';
import { getCategory } from '../../../lib/categories.js';
import SaveButton from '../../../components/SaveButton';

export const dynamic = 'force-dynamic';

const SOURCE_LABELS = { hh: 'HH.ru', telegram: 'Telegram', sample: 'Тест. данные' };

function formatSalary(v) {
  if (!v.salaryMin && !v.salaryMax) return 'Зарплата не указана';
  const cur = v.currency === 'USD' ? '$' : v.currency === 'EUR' ? '€' : '₽';
  if (v.salaryMin && v.salaryMax) return `${v.salaryMin.toLocaleString('ru-RU')}–${v.salaryMax.toLocaleString('ru-RU')} ${cur}`;
  if (v.salaryMin) return `от ${v.salaryMin.toLocaleString('ru-RU')} ${cur}`;
  return `до ${v.salaryMax.toLocaleString('ru-RU')} ${cur}`;
}

export default async function VacancyPage({ params }) {
  const vacancy = await prisma.vacancy.findUnique({ where: { id: params.id } });
  if (!vacancy) notFound();

  const category = vacancy.categoryId ? getCategory(vacancy.categoryId) : null;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg border bg-white p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">{vacancy.title}</h1>
            {vacancy.company && <p className="mt-1 text-gray-500">{vacancy.company}</p>}
          </div>
          <span className="shrink-0 rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
            {SOURCE_LABELS[vacancy.source] || vacancy.source}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
          <span className="font-medium">{formatSalary(vacancy)}</span>
          {vacancy.location && <span>{vacancy.location}</span>}
          {vacancy.remote && <span className="text-brand-600">Удалённо</span>}
          {category && (
            <Link href={`/vacancies/${category.id}`} className="text-brand-600 hover:underline">
              {category.icon} {category.label}
            </Link>
          )}
        </div>

        {vacancy.description && (
          <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-gray-700">
            {vacancy.description}
          </p>
        )}

        <div className="mt-6 flex items-center gap-3">
          <a
            href={vacancy.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            Откликнуться →
          </a>
          <SaveButton vacancyId={vacancy.id} />
        </div>
      </div>
    </div>
  );
}
