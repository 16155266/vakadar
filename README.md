# Вакадар

Умный радар IT-вакансий — агрегатор с ИИ-фильтром. Собственная реализация (свой код,
дизайн и тексты), написанная по мотивам идеи сервисов-агрегаторов вакансий; ничего не
скопировано с чужих сайтов.

## Стек

Next.js 14 (App Router) + Prisma/SQLite + NextAuth (Credentials) + Tailwind CSS.

## Быстрый старт

```bash
npm install
cp .env.example .env        # заполните NEXTAUTH_SECRET (openssl rand -base64 32)
npx prisma migrate dev --name init
npm run ingest:hh            # тянет реальные вакансии из HH API (без токена)
npm run dev                  # http://localhost:3000
```

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
