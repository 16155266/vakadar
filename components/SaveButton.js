'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SaveButton({ vacancyId }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (!session) {
      router.push('/login');
      return;
    }
    setBusy(true);
    try {
      const method = saved ? 'DELETE' : 'POST';
      const resp = await fetch('/api/favorites', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vacancyId }),
      });
      if (resp.ok) setSaved(!saved);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
    >
      {saved ? '★ В избранном' : '☆ Сохранить'}
    </button>
  );
}
