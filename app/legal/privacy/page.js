export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Политика конфиденциальности</h1>
      <div className="rounded-lg border border-dashed bg-white p-6 text-sm text-gray-500">
        <p className="font-medium text-gray-700">Шаблон-заглушка — требует проверки юристом перед публикацией.</p>
        <p className="mt-3">Обязательные разделы для доработки:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Какие персональные данные собираются (email, пароль-хэш, избранные категории)</li>
          <li>Цели обработки данных</li>
          <li>Сроки хранения и порядок удаления по запросу пользователя</li>
          <li>Передача данных третьим лицам (если есть)</li>
          <li>Контакты оператора данных для запросов субъектов данных</li>
          <li>Соответствие 152-ФЗ «О персональных данных» (если сервис работает с гражданами РФ)</li>
        </ul>
      </div>
    </div>
  );
}
