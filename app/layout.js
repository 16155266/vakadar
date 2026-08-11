import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

export const metadata = {
  title: 'Вакадар — умный радар IT-вакансий',
  description: 'Агрегатор IT-вакансий с персонализацией и ИИ-фильтрацией',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Nav />
          <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
