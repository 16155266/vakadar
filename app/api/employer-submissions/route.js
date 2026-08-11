import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';
import { CATEGORIES } from '../../../lib/categories.js';

const schema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  contactInfo: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().optional().nullable(),
  salaryMin: z.number().optional().nullable(),
  salaryMax: z.number().optional().nullable(),
  location: z.string().optional().nullable(),
});

export async function POST(req) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 });
  }

  const data = parsed.data;
  const categoryId = CATEGORIES.some((c) => c.id === data.categoryId) ? data.categoryId : null;

  const submission = await prisma.employerSubmission.create({
    data: { ...data, categoryId, status: 'pending' },
  });

  return NextResponse.json({ ok: true, id: submission.id });
}
