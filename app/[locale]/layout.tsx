import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/navigation';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Hushkordik | Fullstack Developer",
  description: "Web saytlar va Telegram botlar yaratuvchi Fullstack dasturchi",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark scroll-smooth">
      <body className={`${inter.className} bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
