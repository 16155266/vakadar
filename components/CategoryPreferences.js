'use client';

import { useState } from 'react';
import { CATEGORIES } from '../lib/categories.js';

export default function CategoryPreferences({ initialSelected }) {
  const [selected, setSelected] = useState(new Set(initialSelected));
  const [saving, setSaving] = useState(false);

  function toggle(id) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    save(next);
  }

  async function save(next) {
    setSaving(true);
    await fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryIds: Array.from(next) }),
    });
    setSaving(false);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => toggle(c.id)}
            className={`rounded-full border px-3 py-1 text-sm ${
              selected.has(c.id)
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>
      {saving && <p className="mt-2 text-xs text-gray-400">Сохранение...</p>}
    </div>
  );
}
