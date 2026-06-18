'use client';

import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Header from './Header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

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

  return (
    <NextIntlClientProvider locale={locale}>
      <>
        <Header />
        {children}
      </>
    </NextIntlClientProvider>
  );
}