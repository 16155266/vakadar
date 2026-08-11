import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white py-8 text-sm text-gray-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <span>© {new Date().getFullYear()} Вакадар</span>
        <div className="flex gap-4">
          <Link href="/legal/offer" className="hover:text-brand-600">
            Оферта
          </Link>
          <Link href="/legal/privacy" className="hover:text-brand-600">
            Политика конфиденциальности
          </Link>
          <Link href="/legal/terms" className="hover:text-brand-600">
            Условия подписки
          </Link>
        </div>
      </div>
    </footer>
  );
}
