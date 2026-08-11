import Link from 'next/link';

const LINKS = [
  { href: '/vacancies', label: 'Вакансии' },
  { href: '/salaries', label: 'Зарплаты' },
  { href: '/blog', label: 'Блог' },
  { href: '/faq', label: 'FAQ' },
];

export default function Nav() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-brand-700">
          Вакадар
        </Link>
        <nav className="hidden gap-6 text-sm text-gray-600 sm:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand-600">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/employers/post"
            className="rounded-md border border-brand-500 px-3 py-1.5 text-brand-600 hover:bg-brand-50"
          >
            Разместить вакансию
          </Link>
          <Link
            href="/cabinet"
            className="rounded-md bg-brand-500 px-3 py-1.5 text-white hover:bg-brand-600"
          >
            Кабинет
          </Link>
        </div>
      </div>
    </header>
  );
}
