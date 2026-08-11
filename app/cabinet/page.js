import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import CategoryPreferences from '../../components/CategoryPreferences';
import SignOutButton from '../../components/SignOutButton';
import VacancyCard from '../../components/VacancyCard';

export const dynamic = 'force-dynamic';

export default async function CabinetPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { preferredCategories: true },
  });

  const savedVacancies = await prisma.savedVacancy.findMany({
    where: { userId: session.user.id },
    include: { vacancy: true },
    orderBy: { createdAt: 'desc' },
  });

  const preferredIds = user.preferredCategories.map((c) => c.id);
  const personalized = preferredIds.length
    ? await prisma.vacancy.findMany({
        where: { categoryId: { in: preferredIds } },
        orderBy: { publishedAt: 'desc' },
        take: 12,
      })
    : [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Личный кабинет</h1>
        <SignOutButton />
      </div>
      <p className="mt-1 text-sm text-gray-500">{session.user.email}</p>

      <section className="mt-8">
        <h2 className="mb-2 text-lg font-medium">Ваши категории</h2>
        <p className="mb-3 text-sm text-gray-500">
          Выберите специализации — лента ниже будет собираться только из них.
        </p>
        <CategoryPreferences initialSelected={preferredIds} />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-medium">Персональная лента</h2>
        {personalized.length === 0 ? (
          <p className="rounded-lg border border-dashed p-6 text-sm text-gray-500">
            Выберите хотя бы одну категорию выше, чтобы увидеть персональную ленту.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {personalized.map((v) => (
              <VacancyCard key={v.id} vacancy={v} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-medium">Сохранённые вакансии</h2>
        {savedVacancies.length === 0 ? (
          <p className="rounded-lg border border-dashed p-6 text-sm text-gray-500">
            Пока ничего не сохранено — нажимайте «Сохранить» на странице вакансии.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {savedVacancies.map((s) => (
              <VacancyCard key={s.id} vacancy={s.vacancy} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
