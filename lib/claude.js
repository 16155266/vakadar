// Классификация текстов Telegram-постов через личную OAuth-квоту подписки Claude
// (тот же паттерн, что в HHcl/extension/background.js): без платного API-ключа,
// токен получается через `ant auth print-credentials --access-token`.

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';

function buildExtractionPrompt(postText, categories) {
  const categoryIds = categories.map((c) => c.id).join(', ');
  return `Ты обрабатываешь пост из Telegram-канала и должен определить, является ли он объявлением о вакансии, и если да — извлечь структурированные данные.

ТЕКСТ ПОСТА:
${postText}

Доступные категории: ${categoryIds}

Ответь СТРОГО в формате JSON без markdown-разметки и без пояснений вокруг:
{
  "isVacancy": true/false,
  "title": "название должности или null",
  "company": "название компании или null",
  "salaryMin": число или null,
  "salaryMax": число или null,
  "currency": "RUB/USD/EUR или null",
  "location": "город или 'Удалённо' или null",
  "remote": true/false,
  "category": "один из: ${categoryIds}, или null если не подходит ни одна",
  "applyUrl": "ссылка/контакт для отклика, если явно указана в тексте, иначе null"
}

Если пост не является вакансией (реклама, обсуждение, вопрос, не про работу) — верни {"isVacancy": false}.`;
}

async function callClaude(prompt) {
  const token = process.env.ANT_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      'ANT_ACCESS_TOKEN не задан в .env. Выполните `ant auth print-credentials --access-token` и положите результат в .env.'
    );
  }

  const resp = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'oauth-2025-04-20',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (resp.status === 401) {
    throw new Error(
      'OAuth-токен истёк или неверен. Выполните `ant auth print-credentials --access-token` заново и обновите ANT_ACCESS_TOKEN в .env.'
    );
  }
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Claude API ${resp.status}: ${text}`);
  }

  const data = await resp.json();
  const textBlock = (data?.content || []).find((b) => b.type === 'text');
  const raw = textBlock?.text || '{}';
  const jsonStart = raw.indexOf('{');
  const jsonEnd = raw.lastIndexOf('}');
  const jsonSlice = raw.slice(jsonStart, jsonEnd + 1);
  return JSON.parse(jsonSlice);
}

export async function classifyVacancyPost(postText, categories) {
  return callClaude(buildExtractionPrompt(postText, categories));
}
