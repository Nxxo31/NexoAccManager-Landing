'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const locale = pathname.split('/')[1] || 'es';
  const currentPath = pathname.split('/').slice(3).join('/') || 'overview';

  const navItems = [
    { key: 'overview', href: `/${locale}/dashboard`, label: tNav('overview'), icon: '◈' },
    { key: 'billing', href: `/${locale}/dashboard/billing`, label: tNav('billing'), icon: '◉' },
    { key: 'download', href: `/${locale}/dashboard/download`, label: tNav('download'), icon: '◎' },
    { key: 'settings', href: `/${locale}/dashboard/settings`, label: tNav('settings'), icon: '◇' },
  ];

  return (
    <div className="flex min-h-screen bg-bg-dark">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-bg-card/80 backdrop-blur-xl border-r border-border/50 flex flex-col transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-primary text-xl font-bold">NexoAccManager</span>
          </Link>
          <p className="text-xs text-text-secondary mt-1">Account Dashboard</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.key || (item.key === 'overview' && pathname === `/${locale}/dashboard`);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface/50'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Back to home */}
        <div className="p-4 border-t border-border/50">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-surface/50 transition-all duration-200"
          >
            <span className="text-base">←</span>
            {tNav('backToHome')}
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-bg-card/50 backdrop-blur-sm border-b border-border/50 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-surface transition-colors"
            aria-label="Open menu"
          >
            <span className="text-xl">☰</span>
          </button>
          <span className="text-sm font-semibold text-text-primary">NexoAccManager</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}