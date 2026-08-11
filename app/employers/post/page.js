'use client';

import { useState } from 'react';
import { CATEGORIES } from '../../../lib/categories.js';

const EMPTY = {
  companyName: '',
  contactName: '',
  contactInfo: '',
  title: '',
  description: '',
  categoryId: '',
  salaryMin: '',
  salaryMax: '',
  location: '',
};

export default function PostVacancyPage() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | busy | done | error
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('busy');
    setError('');

    const resp = await fetch('/api/employer-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
        categoryId: form.categoryId || null,
      }),
    });

    if (resp.ok) {
      setStatus('done');
      setForm(EMPTY);
    } else {
      const data = await resp.json();
      setError(data.error || 'Ошибка отправки');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="mx-auto max-w-lg rounded-lg border bg-white p-8 text-center">
        <h1 className="text-xl font-semibold">Заявка отправлена</h1>
        <p className="mt-2 text-sm text-gray-500">
          Вакансия отправлена на модерацию. После проверки она появится в каталоге.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-semibold">Разместить вакансию</h1>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6">
        <div>
          <label className="block text-sm text-gray-600">Компания *</label>
          <input
            required
            value={form.companyName}
            onChange={(e) => update('companyName', e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600">Контактное лицо *</label>
            <input
              required
              value={form.contactName}
              onChange={(e) => update('contactName', e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Email / Telegram *</label>
            <input
              required
              value={form.contactInfo}
              onChange={(e) => update('contactInfo', e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600">Должность *</label>
          <input
            required
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Категория</label>
          <select
            value={form.categoryId}
            onChange={(e) => update('categoryId', e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          >
            <option value="">Не выбрано</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-600">Зарплата от</label>
            <input
              type="number"
              value={form.salaryMin}
              onChange={(e) => update('salaryMin', e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Зарплата до</label>
            <input
              type="number"
              value={form.salaryMax}
              onChange={(e) => update('salaryMax', e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Город</label>
            <input
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600">Описание вакансии *</label>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={status === 'busy'}
          className="w-full rounded-md bg-brand-500 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
        >
          {status === 'busy' ? 'Отправка...' : 'Отправить на модерацию'}
        </button>
      </form>
    </div>
  );
}
