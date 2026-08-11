'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function SalaryChart({ data }) {
  const chartData = data
    .filter((d) => d.median !== null)
    .map((d) => ({ name: `${d.icon} ${d.label}`, Медиана: d.median }));

  if (chartData.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-8 text-center text-gray-500">
        Пока нет данных для графика — запустите <code>npm run ingest</code>.
      </p>
    );
  }

  return (
    <div className="h-96 w-full rounded-lg border bg-white p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => `${v.toLocaleString('ru-RU')} ₽`} />
          <Bar dataKey="Медиана" fill="#3d63dd" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
