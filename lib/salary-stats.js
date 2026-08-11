import { prisma } from './prisma';
import { CATEGORIES } from './categories.js';

function median(values) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

export async function getSalaryStatsByCategory() {
  const vacancies = await prisma.vacancy.findMany({
    where: {
      categoryId: { not: null },
      OR: [{ salaryMin: { not: null } }, { salaryMax: { not: null } }],
    },
    select: { categoryId: true, salaryMin: true, salaryMax: true },
  });

  const byCategory = new Map();
  for (const v of vacancies) {
    const midpoint = v.salaryMin && v.salaryMax
      ? (v.salaryMin + v.salaryMax) / 2
      : v.salaryMin || v.salaryMax;
    if (!midpoint) continue;
    if (!byCategory.has(v.categoryId)) byCategory.set(v.categoryId, []);
    byCategory.get(v.categoryId).push(midpoint);
  }

  return CATEGORIES.map((cat) => {
    const values = byCategory.get(cat.id) || [];
    return {
      id: cat.id,
      label: cat.label,
      icon: cat.icon,
      count: values.length,
      median: median(values),
      min: values.length ? Math.min(...values) : null,
      max: values.length ? Math.max(...values) : null,
    };
  });
}
