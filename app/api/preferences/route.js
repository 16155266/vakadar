import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';
import { CATEGORIES } from '../../../lib/categories.js';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

  const { categoryIds } = await req.json();
  const valid = Array.isArray(categoryIds)
    ? categoryIds.filter((id) => CATEGORIES.some((c) => c.id === id))
    : [];

  await prisma.user.update({
    where: { id: session.user.id },
    data: { preferredCategories: { set: valid.map((id) => ({ id })) } },
  });

  return NextResponse.json({ ok: true, categoryIds: valid });
}
