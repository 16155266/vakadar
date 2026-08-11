export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Условия подписки</h1>
      <div className="rounded-lg border border-dashed bg-white p-6 text-sm text-gray-500">
        <p className="font-medium text-gray-700">Шаблон-заглушка — платных подписок пока нет (см. roadmap в README, Phase 2).</p>
        <p className="mt-3">Когда появятся платные тарифы, здесь нужно описать:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Состав и стоимость тарифов</li>
          <li>Периодичность оплаты и автопродление</li>
          <li>Порядок отказа от подписки и возврата средств</li>
          <li>Что входит/не входит в бесплатный доступ</li>
        </ul>
      </div>
    </div>
  );
}
