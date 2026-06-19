'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/app/lib/api';

interface UserData {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
  language: string;
  createdAt: string;
  license: {
    plan: string;
    accountLimit: number;
    status: string;
    currentPeriodEnd: string | null;
  } | null;
  planDetails: {
    id: string;
    name: string;
    price: number;
    accountLimit: number;
  } | null;
}

function PlanBadge({ plan }: { plan: string }) {
  const colors: Record<string, string> = {
    Free: 'bg-text-secondary/20 text-text-secondary border-text-secondary/30',
    Starter: 'bg-success/20 text-success border-success/30',
    Pro: 'bg-accent/20 text-accent border-accent/30',
    Business: 'bg-warning/20 text-warning border-warning/30',
    Enterprise: 'bg-primary/20 text-primary border-primary/30',
  };
  const cls = colors[plan] || 'bg-accent/20 text-accent border-accent/30';
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      {plan}
    </span>
  );
}

function ProgressBar({ current, limit }: { current: number; limit: number }) {
  const pct = Math.min((current / limit) * 100, 100);
  const color = pct >= 90 ? 'bg-error' : pct >= 70 ? 'bg-warning' : 'bg-accent';
  return (
    <div className="w-full bg-bg-surface rounded-full h-2.5 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function formatPrice(cents: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : locale === 'pt' ? 'pt-BR' : 'es-ES', {
    style: 'currency',
    currency: 'USD',
  }).format(cents);
}

function formatDate(dateStr: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : locale === 'pt' ? 'pt-BR' : 'es-ES', {
    dateStyle: 'medium',
  }).format(new Date(dateStr));
}

export default function DashboardContent({ params }: { params: { locale: string } }) {
  const t = useTranslations('dashboard.overview');
  const tTitle = useTranslations('dashboard');
  const tBtn = useTranslations('dashboard.billing');
  const pathname = usePathname();
  const locale = params.locale;
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const result = await apiFetch<UserData>('/auth/me');
      if (result.success) {
        setUser(result.data!);
      } else {
        setError(result.error || 'Failed to load user data');
      }
      setLoading(false);
    })();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${typeof window !== 'undefined' ? window.location.origin : ''}/${locale}/dashboard`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-error mb-4">{error || 'Not authenticated'}</p>
        <Link href={`/${locale}/login`} className="text-accent hover:underline">
          {t('signIn', { default: 'Sign in' })}
        </Link>
      </div>
    );
  }

  const planName = user.license?.plan ?? 'Free';
  const accountLimit = user.license?.accountLimit ?? 5;
  const planPrice = user.planDetails?.price != null
    ? formatPrice(user.planDetails.price, locale)
    : '$0';

  // Approximate usage: use 0 since we don't track account usage on the backend yet
  const usagePct = 0;
  const showUpgrade = false;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{tTitle('title')}</h1>
          <p className="text-sm text-text-secondary mt-1">{user.email}</p>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-lg bg-bg-surface hover:bg-bg-card transition-colors border border-border/50"
        >
          {copied ? '✓ Copiado' : '📋 Copiar enlace'}
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Plan card */}
        <div className="group bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-accent/30 transition-all duration-200 hover:shadow-lg hover:shadow-accent/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t('currentPlan')}
            </span>
            <span className="text-accent text-sm">◈</span>
          </div>
          <div className="flex items-end gap-3">
            <PlanBadge plan={planName} />
          </div>
          <p className="text-xs text-text-secondary mt-3">
            {planPrice}{planPrice !== '$0' ? '/mes' : ''}
          </p>
        </div>

        {/* Usage card */}
        <div className="group bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-accent/30 transition-all duration-200 hover:shadow-lg hover:shadow-accent/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t('accountUsage')}
            </span>
            <span className="text-accent text-sm">◎</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            <span className="text-text-secondary text-base font-normal">/ {accountLimit}</span>
          </p>
          <ProgressBar current={0} limit={accountLimit} />
        </div>

        {/* Next payment card */}
        <div className="group bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-accent/30 transition-all duration-200 hover:shadow-lg hover:shadow-accent/5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t('nextPayment')}
            </span>
            <span className="text-accent text-sm">◉</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">
            {user.license?.currentPeriodEnd
              ? formatDate(user.license.currentPeriodEnd, locale)
              : t('noActiveSubscription', { default: 'Sin suscripción activa' })}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {showUpgrade && (
          <Link
            href={`/${locale}/dashboard/billing`}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-primary/20"
          >
            <span>↑</span>
            {t('upgrade')}
          </Link>
        )}
        <Link
          href={`/${locale}/dashboard/billing`}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-accent/20"
        >
          <span>◉</span>
          {t('viewBilling')}
        </Link>
        <Link
          href={`/${locale}/dashboard/download`}
          className="flex items-center gap-2 px-5 py-2.5 bg-bg-surface hover:bg-bg-card text-text-primary rounded-xl text-sm font-medium transition-colors border border-border/50"
        >
          ↓ Descargar app
        </Link>
      </div>

      {/* Quick links */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`/${locale}/dashboard/settings`}
          className="flex items-center gap-3 p-4 bg-bg-card/40 backdrop-blur-sm border border-border/30 rounded-xl hover:border-border/60 transition-all duration-200 group"
        >
          <span className="text-2xl text-accent/60 group-hover:text-accent transition-colors">⚙</span>
          <div>
            <p className="text-sm font-medium text-text-primary">Configuración</p>
            <p className="text-xs text-text-secondary">Idioma, tema y notificaciones</p>
          </div>
        </Link>
        <Link
          href={`/${locale}/dashboard/download`}
          className="flex items-center gap-3 p-4 bg-bg-card/40 backdrop-blur-sm border border-border/30 rounded-xl hover:border-border/60 transition-all duration-200 group"
        >
          <span className="text-2xl text-accent/60 group-hover:text-accent transition-colors">⬇</span>
          <div>
            <p className="text-sm font-medium text-text-primary">Descargar app</p>
            <p className="text-xs text-text-secondary">Para Windows, macOS y Linux</p>
          </div>
        </Link>
      </div>
    </div>
  );
}