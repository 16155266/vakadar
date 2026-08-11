export default function OfferPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Публичная оферта</h1>
      <div className="rounded-lg border border-dashed bg-white p-6 text-sm text-gray-500">
        <p className="font-medium text-gray-700">Шаблон-заглушка — требует проверки юристом перед публикацией.</p>
        <p className="mt-3">Обязательные разделы для доработки:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Стороны и предмет договора (сервис-агрегатор вакансий, платные размещения работодателей)</li>
          <li>Порядок акцепта оферты</li>
          <li>Права и обязанности сторон</li>
          <li>Стоимость услуг и порядок оплаты (если вводятся платные размещения)</li>
          <li>Ответственность сторон, форс-мажор</li>
          <li>Реквизиты владельца сервиса</li>
        </ul>
      </div>
    </div>
  );
}
