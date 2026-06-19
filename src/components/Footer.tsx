'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('landing.footer');

  return (
    <footer className="border-t border-border/50 mt-24 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-text-secondary">
          <div>
            <h3 className="mb-4 font-semibold text-primary">NexoAccManager</h3>
            <p className="text-sm">{t('description')}</p>
          </div>

          <div>
            <h4 className="mb-3 font-medium text-white">{t('product')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-primary transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-medium text-white">{t('legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  {t('privacy')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-medium text-white">{t('language')}</h4>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded text-sm bg-primary/20 text-primary hover:bg-primary/30">
                🇪🇸 ES
              </button>
              <button className="px-3 py-1 rounded text-sm bg-primary/20 text-primary hover:bg-primary/30">
                🇬🇧 EN
              </button>
              <button className="px-3 py-1 rounded text-sm bg-primary/20 text-primary hover:bg-primary/30">
                🇵🇹 PT
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs">
          © {new Date().getFullYear()} NexoAccManager. {t('copyright')}
        </div>
      </div>
    </footer>
  );
}