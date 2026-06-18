import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from '../components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NexoAccManager — El gestor de cuentas Roblox que los pros usan',
  description: 'Gestor de cuentas Roblox con modelo SaaS freemium. Clon moderno, seguro y con valor añadido sustancial sobre Roblox Account Manager.',
  keywords: ['Roblox', 'account manager', 'NexoAccManager', 'cuentas Roblox', 'automatización'],
  authors: [{ name: 'NexoAccManager' }],
  openGraph: {
    title: 'NexoAccManager — El gestor de cuentas Roblox que los pros usan',
    description: 'Gestor de cuentas Roblox con modelo SaaS freemium.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://nexoaccmanager.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
