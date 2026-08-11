'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');

    const resp = await fetch('/api/gate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, from: searchParams.get('from') }),
    });
    const data = await resp.json();

    if (!resp.ok) {
      setError(data.error || 'Ошибка');
      setBusy(false);
      return;
    }

    window.location.href = data.redirect || '/';
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm items-center">
      <form onSubmit={handleSubmit} className="w-full space-y-4 rounded-lg border bg-white p-6">
        <div>
          <h1 className="text-lg font-semibold">Вакадар в разработке</h1>
          <p className="mt-1 text-sm text-gray-500">Сайт закрыт паролем на время разработки.</p>
        </div>
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="w-full rounded border px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-brand-500 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
