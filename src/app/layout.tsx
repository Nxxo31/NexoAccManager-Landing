import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import messages from './messages/es.json';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NexoAccManager',
  description: 'Gestor de cuentas Roblox con modelo SaaS freemium.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <NextIntlClientProvider locale="es" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}