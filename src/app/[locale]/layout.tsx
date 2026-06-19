import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NexoAccManager — El gestor de cuentas Roblox que los pros usan',
  description:
    'Gestor de cuentas Roblox con modelo SaaS freemium. Clon moderno, seguro y con valor añadido sustancial sobre Roblox Account Manager.',
};

// Must tell Next.js which segments are dynamic
export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'pt' }];
}

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // validate locale
  if (!['es', 'en', 'pt'].includes(locale)) {
    notFound();
  }

  // load messages server-side (build-time) - NO dynamic import in client
  let messages;
  try {
    messages = (await import(`@/app/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}