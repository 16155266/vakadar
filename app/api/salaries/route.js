import { NextResponse } from 'next/server';
import { getSalaryStatsByCategory } from '../../../lib/salary-stats.js';

export async function GET() {
  const stats = await getSalaryStatsByCategory();
  return NextResponse.json(stats);
}
