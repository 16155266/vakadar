// Парсит публичные превью-страницы t.me/s/<channel> (не требует авторизации),
// прогоняет каждый пост через ИИ-классификацию (lib/claude.js) и сохраняет
// найденные вакансии в БД. Список каналов — lib/telegram-channels.js
// (замените заглушки на реальные каналы перед запуском).
import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
import { TELEGRAM_CHANNELS } from '../lib/telegram-channels.js';
import { CATEGORIES } from '../lib/categories.js';
import { classifyVacancyPost } from '../lib/claude.js';

const prisma = new PrismaClient();
const PLACEHOLDER_PREFIX = 'example_';

async function fetchChannelPosts(channel) {
  const resp = await fetch(`https://t.me/s/${channel}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Vakadar/0.1; personal project)' },
  });
  if (!resp.ok) {
    console.error(`  t.me/s/${channel}: HTTP ${resp.status} (канал не существует, приватный, или недоступен)`);
    return [];
  }
  const html = await resp.text();
  const $ = cheerio.load(html);
  const posts = [];

  $('.tgme_widget_message').each((_, el) => {
    const dataPost = $(el).attr('data-post'); // "channel/123"
    const messageId = dataPost ? dataPost.split('/')[1] : null;
    const text = $(el).find('.tgme_widget_message_text').first().text().trim();
    if (messageId && text) {
      posts.push({ messageId, text });
    }
  });

  return posts;
}

async function main() {
  if (!process.env.ANT_ACCESS_TOKEN) {
    console.error(
      'ANT_ACCESS_TOKEN не задан. Выполните `ant auth print-credentials --access-token` и положите результат в .env как ANT_ACCESS_TOKEN.'
    );
    process.exit(1);
  }

  const realChannels = TELEGRAM_CHANNELS.filter((c) => !c.startsWith(PLACEHOLDER_PREFIX));
  if (realChannels.length === 0) {
    console.error(
      'lib/telegram-channels.js содержит только заглушки. Замените их на реальные публичные @username каналов перед запуском парсинга.'
    );
    process.exit(1);
  }

  let totalSaved = 0;

  for (const channel of realChannels) {
    console.log(`Канал: @${channel}`);
    const posts = await fetchChannelPosts(channel);
    console.log(`  Постов на странице: ${posts.length}`);

    for (const post of posts) {
      const externalId = `${channel}:${post.messageId}`;
      const exists = await prisma.vacancy.findUnique({
        where: { source_externalId: { source: 'telegram', externalId } },
      });
      if (exists) continue; // уже обработан в прошлый прогон

      let parsed;
      try {
        parsed = await classifyVacancyPost(post.text, CATEGORIES);
      } catch (e) {
        console.error(`  Ошибка классификации поста ${externalId}: ${e.message}`);
        continue;
      }

      if (!parsed.isVacancy) continue;

      const validCategoryId = CATEGORIES.some((c) => c.id === parsed.category)
        ? parsed.category
        : null;

      await prisma.vacancy.create({
        data: {
          source: 'telegram',
          externalId,
          title: parsed.title || 'Вакансия без названия',
          company: parsed.company || null,
          categoryId: validCategoryId,
          location: parsed.location || null,
          salaryMin: parsed.salaryMin || null,
          salaryMax: parsed.salaryMax || null,
          currency: parsed.currency || null,
          remote: Boolean(parsed.remote),
          description: post.text.slice(0, 2000),
          applyUrl: parsed.applyUrl || `https://t.me/${channel}/${post.messageId}`,
        },
      });
      totalSaved += 1;
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`Готово. Новых вакансий из Telegram: ${totalSaved}`);
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
