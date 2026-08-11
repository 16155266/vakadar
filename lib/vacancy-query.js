import { prisma } from './prisma';

export function buildVacancyWhere({ category, salaryMin, remote, q } = {}) {
  const where = {};
  if (category) where.categoryId = category;
  if (remote === '1' || remote === true) where.remote = true;
  if (salaryMin) {
    const min = Number(salaryMin);
    if (!Number.isNaN(min)) {
      where.OR = [{ salaryMin: { gte: min } }, { salaryMax: { gte: min } }];
    }
  }
  if (q) {
    where.title = { contains: q };
  }
  return where;
}

export async function findVacancies(where, { take = 30 } = {}) {
  return prisma.vacancy.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
    take,
  });
}
