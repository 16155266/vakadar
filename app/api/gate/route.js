import { NextResponse } from 'next/server';
import { GATE_COOKIE, gateTokenFor } from '../../../lib/gate';

export async function POST(req) {
  const { password, from } = await req.json();

  if (password !== process.env.SITE_PASSWORD) {
    return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });
  }

  const token = await gateTokenFor(password);
  const res = NextResponse.json({ ok: true, redirect: from || '/' });
  res.cookies.set(GATE_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
  return res;
}
