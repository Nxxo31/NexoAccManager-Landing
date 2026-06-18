'use client';

import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './Header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const [messages, setMessages] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    // Update hreflang tags when route changes
    if (typeof document !== 'undefined') {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

      const locales = ['es', 'en', 'pt'];
      locales.forEach((loc) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.setAttribute('hreflang', loc);
        link.href = `${loc === locale ? '' : `/${loc}`}${pathname}`;
        document.head.appendChild(link);
      });

      const xDefaultLink = document.createElement('link');
      xDefaultLink.rel = 'alternate';
      xDefaultLink.setAttribute('hreflang', 'x-default');
      xDefaultLink.href = `${locale === 'es' ? '' : '/es'}${pathname}`;
      document.head.appendChild(xDefaultLink);
    }
  }, [pathname, locale]);

  // Load messages for the current locale
  useEffect(() => {
    const loadMessages = async () => {
      try {
        let msg;
        if (locale === 'en') {
          msg = (await import('@/app/messages/en.json')).default;
        } else if (locale === 'es') {
          msg = (await import('@/app/messages/es.json')).default;
        } else {
          msg = (await import('@/app/messages/pt.json')).default;
        }
        setMessages(msg);
      } catch (error) {
        console.error('Error loading messages:', error);
        // Fallback to empty object
        setMessages({});
      }
    };
    loadMessages();
  }, [locale]);

  if (!messages) {
    // Loading state - render children without translation for now
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <>
        <Header />
        {children}
      </>
    </NextIntlClientProvider>
  );
}
