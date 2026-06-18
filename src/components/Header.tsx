'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Extract locale from pathname (e.g., /es/login -> es)
  const locale = pathname.split('/')[1] || 'es';
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    // Preserve the current path but change the locale
    const pathWithoutLocale = pathname.split('/').slice(2).join('/');
    const newPath = `/${newLocale}/${pathWithoutLocale}`;
    router.push(newPath);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeof document !== 'undefined') {
        const header = document.querySelector('header');
        if (header && !header.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const t = useTranslations('links');

  return (
    <header className="bg-dark/90 backdrop-blur-sm border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:text-accent transition-colors">
              <span className="text-xl font-bold text-primary">NexoAccManager</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-secondary/70 hover:text-secondary transition-colors font-medium">
              {t('home') || 'Home'}
            </Link>
            <Link href="/features" className="text-secondary/70 hover:text-secondary transition-colors font-medium">
              {t('features') || 'Features'}
            </Link>
            <Link href="/pricing" className="text-secondary/70 hover:text-secondary transition-colors font-medium">
              {t('pricing') || 'Pricing'}
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className="flex items-center gap-2 text-secondary/70 hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                {/* Flag icons based on locale */}
                {locale === 'es' && <span className="text-xl">🇪🇸</span>}
                {locale === 'en' && <span className="text-xl">🇺🇸</span>}
                {locale === 'pt' && <span className="text-xl">🇧🇷</span>}
                <span className="ml-1 text-sm font-medium">{locale.toUpperCase()}</span>
                <span className="ml-1 text-xs">▼</span>
              </button>
              
              <div 
                id="language-dropdown"
                className={`absolute right-0 mt-2 w-32 rounded-md bg-dark/95 border border-border/20 py-2 text-left z-20 ${isDropdownOpen ? '' : 'hidden'}`}
              >
                <button
                  onClick={() => handleLanguageChange('es')}
                  className={`flex w-full text-left px-3 py-2 text-sm ${locale === 'es' ? 'bg-accent/20 text-accent' : 'text-secondary hover:bg-accent/10'}`}
                >
                  🇪🇸 Español
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`flex w-full text-left px-3 py-2 text-sm ${locale === 'en' ? 'bg-accent/20 text-accent' : 'text-secondary hover:bg-accent/10'}`}
                >
                  🇺🇸 English
                </button>
                <button
                  onClick={() => handleLanguageChange('pt')}
                  className={`flex w-full text-left px-3 py-2 text-sm ${locale === 'pt' ? 'bg-accent/20 text-accent' : 'text-secondary hover:bg-accent/10'}`}
                >
                  🇧🇷 Português
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
