const FAQ = [
  {
    q: 'Откуда берутся вакансии?',
    a: 'Из открытого API HH.ru и публичных Telegram-каналов (список каналов настраивается в lib/telegram-channels.js).',
  },
  {
    q: 'Как часто обновляется каталог?',
    a: 'Запустите npm run ingest вручную или поставьте его на cron — каждый прогон подтягивает новые вакансии и не создаёт дублей.',
  },
  {
    q: 'Как убрать дубли между HH и Telegram?',
    a: 'Дедупликация идёт по паре источник+внешний ID, поэтому один и тот же пост из Telegram не сохранится дважды. Между HH и Telegram дедупликации по смыслу пока нет — это можно добавить отдельно.',
  },
  {
    q: 'Как разместить вакансию как работодатель?',
    a: 'На странице «Разместить вакансию» — форма попадает в очередь модерации (таблица EmployerSubmission).',
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold">FAQ</h1>
      <div className="space-y-4">
        {FAQ.map((item) => (
          <div key={item.q} className="rounded-lg border bg-white p-4">
            <h2 className="font-medium">{item.q}</h2>
            <p className="mt-1 text-sm text-gray-600">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
