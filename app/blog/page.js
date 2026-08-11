export default function BlogPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Блог</h1>
      <p className="rounded-lg border border-dashed p-8 text-center text-gray-500">
        Пока пусто — здесь будут статьи о поиске работы в IT, обзоры зарплат и разборы рынка.
        Добавляйте посты как страницы <code>app/blog/[slug]/page.js</code> с MDX или обычным React.
      </p>
    </div>
  );
}
