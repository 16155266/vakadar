import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

  const saved = await prisma.savedVacancy.findMany({
    where: { userId: session.user.id },
    include: { vacancy: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(saved.map((s) => s.vacancy));
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

  const { vacancyId } = await req.json();
  if (!vacancyId) return NextResponse.json({ error: 'vacancyId обязателен' }, { status: 400 });

  await prisma.savedVacancy.upsert({
    where: { userId_vacancyId: { userId: session.user.id, vacancyId } },
    update: {},
    create: { userId: session.user.id, vacancyId },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

  const { vacancyId } = await req.json();
  if (!vacancyId) return NextResponse.json({ error: 'vacancyId обязателен' }, { status: 400 });

  await prisma.savedVacancy.deleteMany({ where: { userId: session.user.id, vacancyId } });
  return NextResponse.json({ ok: true });
}
