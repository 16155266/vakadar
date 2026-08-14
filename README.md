# Вакадар

Умный радар IT-вакансий — агрегатор с ИИ-фильтром. Собственная реализация (свой код,
дизайн и тексты), написанная по мотивам идеи сервисов-агрегаторов вакансий; ничего не
скопировано с чужих сайтов.

## Стек

Next.js 14 (App Router) + Prisma/SQLite + NextAuth (Credentials) + Tailwind CSS.

## Быстрый старт

БД — Postgres (нужен для деплоя на Vercel: там файловая система эфемерна, SQLite не переживёт перезапуск). Локально проще всего использовать бесплатный облачный Postgres (например [Neon](https://neon.tech)) — один и тот же `DATABASE_URL` подходит и для разработки, и для продакшена.

```bash
npm install
cp .env.example .env        # DATABASE_URL с Neon/Vercel Postgres, NEXTAUTH_SECRET (openssl rand -base64 32), SITE_PASSWORD
npx prisma migrate dev --name init
npm run ingest:hh            # тянет реальные вакансии из HH API (без токена)
npm run dev                  # http://localhost:3000
```

## Деплой на Vercel (push → авто-обновление сайта)

1. Зарегистрируйтесь на [neon.tech](https://neon.tech) (бесплатно), создайте проект, скопируйте connection string.
2. На [vercel.com](https://vercel.com) → Add New → Project → импортируйте GitHub-репозиторий `vakadar`.
3. В Environment Variables укажите: `DATABASE_URL` (из Neon), `NEXTAUTH_SECRET`, `SITE_PASSWORD`, при желании `ANT_ACCESS_TOKEN`.
4. Deploy. После первого деплоя разово примените миграции к продовой БД: `npx prisma migrate deploy` с тем же `DATABASE_URL` (можно локально, указав его временно в `.env`).
5. Дальше просто `git push` в `main` — Vercel пересобирает и обновляет сайт автоматически.

### Наполнение вакансиями из Telegram (опционально)

1. Замените заглушки в [`lib/telegram-channels.js`](lib/telegram-channels.js) на реальные
   публичные `@username` каналов (проверьте, что `t.me/s/<channel>` открывается без логина).
2. Получите OAuth-токен личной подписки Claude: `ant auth print-credentials --access-token`
   и положите его в `.env` как `ANT_ACCESS_TOKEN`. Токен короткоживущий — при ошибке 401
   повторите команду и обновите значение.
3. `npm run ingest:telegram`

`npm run ingest` запускает оба источника подряд.

## Структура

- `lib/categories.js` — 12 категорий специализаций (запросы к HH API, ключевые слова)
- `prisma/schema.prisma` — Vacancy, Category, User, SavedVacancy, EmployerSubmission
- `scripts/ingest-hh.mjs`, `scripts/ingest-telegram.mjs` — наполнение БД
- `app/` — страницы (каталог, зарплаты, кабинет, форма для работодателей, блог/FAQ, юр. страницы)

## Roadmap (не реализовано)

- Telegram-бот для дайджестов и поддержки
- Платные подписки/оплата (заглушка на `/legal/terms`)
- Продвинутое ИИ-ранжирование по эмбеддингам
- LinkedIn как источник — сознательно пропущено: массовый парсинг LinkedIn нарушает их ToS
