'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CATEGORIES } from '../lib/categories.js';

export default function VacancyFilters({ lockCategory }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function update(field, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(field, value);
    else params.delete(field);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form className="flex flex-wrap items-end gap-3 rounded-lg border bg-white p-4">
      {!lockCategory && (
        <div>
          <label className="block text-xs text-gray-500">Категория</label>
          <select
            className="mt-1 rounded border px-2 py-1.5 text-sm"
            defaultValue={searchParams.get('category') || ''}
            onChange={(e) => update('category', e.target.value)}
          >
            <option value="">Все</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className="block text-xs text-gray-500">Зарплата от</label>
        <input
          type="number"
          className="mt-1 w-32 rounded border px-2 py-1.5 text-sm"
          defaultValue={searchParams.get('salaryMin') || ''}
          onBlur={(e) => update('salaryMin', e.target.value)}
          placeholder="150000"
        />
      </div>
      <label className="flex items-center gap-2 pb-1.5 text-sm text-gray-600">
        <input
          type="checkbox"
          defaultChecked={searchParams.get('remote') === '1'}
          onChange={(e) => update('remote', e.target.checked ? '1' : '')}
        />
        Только удалённые
      </label>
      <div>
        <label className="block text-xs text-gray-500">Поиск по названию</label>
        <input
          type="text"
          className="mt-1 rounded border px-2 py-1.5 text-sm"
          defaultValue={searchParams.get('q') || ''}
          onBlur={(e) => update('q', e.target.value)}
          placeholder="Backend"
        />
      </div>
    </form>
  );
}
