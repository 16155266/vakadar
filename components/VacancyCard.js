import Link from 'next/link';

const SOURCE_LABELS = { hh: 'HH.ru', telegram: 'Telegram', sample: 'Тест. данные' };

function formatSalary(v) {
  if (!v.salaryMin && !v.salaryMax) return 'Зарплата не указана';
  const cur = v.currency === 'USD' ? '$' : v.currency === 'EUR' ? '€' : '₽';
  if (v.salaryMin && v.salaryMax) return `${v.salaryMin.toLocaleString('ru-RU')}–${v.salaryMax.toLocaleString('ru-RU')} ${cur}`;
  if (v.salaryMin) return `от ${v.salaryMin.toLocaleString('ru-RU')} ${cur}`;
  return `до ${v.salaryMax.toLocaleString('ru-RU')} ${cur}`;
}

export default function VacancyCard({ vacancy }) {
  return (
    <Link
      href={`/vacancy/${vacancy.id}`}
      className="block rounded-lg border bg-white p-4 shadow-sm transition hover:border-brand-400 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-gray-900">{vacancy.title}</h3>
        <span className="shrink-0 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
          {SOURCE_LABELS[vacancy.source] || vacancy.source}
        </span>
      </div>
      {vacancy.company && <p className="mt-1 text-sm text-gray-500">{vacancy.company}</p>}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
        <span>{formatSalary(vacancy)}</span>
        {vacancy.location && <span>{vacancy.location}</span>}
        {vacancy.remote && <span className="text-brand-600">Удалённо</span>}
      </div>
    </Link>
  );
}
