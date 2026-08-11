import { getSalaryStatsByCategory } from '../../lib/salary-stats.js';
import SalaryChart from '../../components/SalaryChart';

export const dynamic = 'force-dynamic';

export default async function SalariesPage() {
  const stats = await getSalaryStatsByCategory();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Зарплаты по категориям</h1>
      <p className="mb-6 text-sm text-gray-500">
        Медиана считается по вакансиям, реально собранным в базе (HH.ru + Telegram), а не по чужим данным.
      </p>

      <SalaryChart data={stats} />

      <div className="mt-8 overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-2">Категория</th>
              <th className="px-4 py-2">Вакансий с зарплатой</th>
              <th className="px-4 py-2">Медиана</th>
              <th className="px-4 py-2">Мин</th>
              <th className="px-4 py-2">Макс</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="px-4 py-2">
                  {s.icon} {s.label}
                </td>
                <td className="px-4 py-2">{s.count}</td>
                <td className="px-4 py-2">{s.median ? `${s.median.toLocaleString('ru-RU')} ₽` : '—'}</td>
                <td className="px-4 py-2">{s.min ? `${s.min.toLocaleString('ru-RU')} ₽` : '—'}</td>
                <td className="px-4 py-2">{s.max ? `${s.max.toLocaleString('ru-RU')} ₽` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
