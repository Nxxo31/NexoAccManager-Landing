'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/app/lib/api';

interface UserData {
  id: string;
  email: string;
  license: {
    plan: string;
    currentPeriodEnd: string | null;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
  } | null;
  planDetails: {
    id: string;
    name: string;
    price: number;
    accountLimit: number;
    features: string[];
  } | null;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  accountLimit: number;
  features: string[];
}

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations('dashboard.billing');
  const styles: Record<string, string> = {
    paid: 'bg-success/20 text-success',
    pending: 'bg-warning/20 text-warning',
    failed: 'bg-error/20 text-error',
    cancelled: 'bg-text-secondary/20 text-text-secondary',
  };
  const label = t(status);
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || ''}`}>
      {label}
    </span>
  );
}

function PlansModal({
  locale,
  plans,
  currentPlan,
  onClose,
  onSelectPlan,
  loading
}: {
  locale: string;
  plans: Plan[];
  currentPlan: string;
  onClose: () => void;
  onSelectPlan: (planId: string) => void;
  loading: boolean;
}) {
  const t = useTranslations('dashboard.billing');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-bg-card border border-border/50 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-lg font-semibold text-text-primary">{t('changePlan')}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-xl transition-colors">
            ✕
          </button>
        </div>
        <div className="p-6 space-y-3">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlan;
            return (
              <button
                key={plan.id}
                onClick={() => !isCurrent && onSelectPlan(plan.id)}
                disabled={isCurrent || loading}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  isCurrent
                    ? 'bg-accent/5 border-accent/30 text-text-primary opacity-60 cursor-default'
                    : 'bg-bg-surface/50 border-border/40 text-text-secondary hover:border-border/70 hover:text-text-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{plan.name}{isCurrent ? ' (actual)' : ''}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{plan.accountLimit === 999999 ? '∞ cuentas' : `${plan.accountLimit} cuentas`}</p>
                  </div>
                  <span className={`font-semibold ${isCurrent ? 'text-text-secondary' : 'text-accent'}`}>
                    {plan.price === 0 ? 'Gratis' : `$${plan.price}/mes`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="p-6 border-t border-border/50">
          <p className="text-xs text-text-secondary text-center">
            Cambios de plan surten efecto inmediatamente. Se prorrateará el cargo.
          </p>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : locale === 'pt' ? 'pt-BR' : 'es-ES', {
    dateStyle: 'medium',
  }).format(new Date(dateStr));
}

export default function BillingContent({ params }: { params: { locale: string } }) {
  const t = useTranslations('dashboard.billing');
  const tTitle = useTranslations('dashboard');
  const pathname = usePathname();
  const locale = params.locale;
  const [showPlans, setShowPlans] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [changingPlan, setChangingPlan] = useState(false);

  useEffect(() => {
    (async () => {
      const [userResult, plansResult] = await Promise.all([
        apiFetch<UserData>('/auth/me'),
        apiFetch<{ plans: Plan[] }>('/license/plans'),
      ]);

      if (userResult.success) setUser(userResult.data!);
      if (plansResult.success) setPlans(plansResult.data!.plans);
      setLoading(false);
    })();
  }, []);

  const handleSelectPlan = async (planId: string) => {
    setChangingPlan(true);
    const result = await apiFetch<{ url: string }>('/stripe/checkout/create-session', {
      method: 'POST',
      body: JSON.stringify({ plan: planId }),
    });
    setChangingPlan(false);

    if (result.success && result.data?.url) {
      window.location.href = result.data.url;
    } else {
      alert(result.error || 'No se pudo iniciar el checkout');
    }
    setShowPlans(false);
  };

  const handleCancelSubscription = async () => {
    const result = await apiFetch('/stripe/portal', { method: 'POST' });
    if (result.success && (result.data as any)?.url) {
      window.location.href = (result.data as any).url;
    } else {
      alert(result.error || 'No se pudo abrir el portal');
    }
    setShowCancelConfirm(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  const currentPlanName = user?.license?.plan ?? 'FREE';
  const planPrice = user?.planDetails?.price != null
    ? `$${user.planDetails.price}/mes`
    : 'Gratis';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{tTitle('title')}</h1>
        <p className="text-sm text-text-secondary mt-1">{t('title').toLowerCase()}</p>
      </div>

      {/* Plan summary */}
      <div className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">{t('currentPlan')}</p>
            <p className="text-2xl font-bold text-text-primary">{currentPlanName}</p>
            <p className="text-accent font-semibold text-sm mt-1">{planPrice}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <button
              onClick={() => setShowPlans(true)}
              className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-accent/20"
            >
              {t('changePlan')}
            </button>
            {user?.license?.stripeSubscriptionId && (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="px-4 py-2 text-xs text-text-secondary hover:text-error transition-colors"
              >
                {t('cancelSubscription')}
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-sm text-text-secondary">
            {t('nextPayment')}:{' '}
            <span className="font-medium text-text-primary">
              {user?.license?.currentPeriodEnd
                ? formatDate(user.license.currentPeriodEnd, locale)
                : t('noActiveSubscription', { default: 'Sin suscripción activa' })}
            </span>
          </p>
        </div>
      </div>

      {/* Payment history placeholder */}
      <div className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="text-base font-semibold text-text-primary">{t('paymentHistory')}</h2>
        </div>
        <div className="p-6 text-center text-text-secondary text-sm">
          {t('noPaymentHistory', { default: 'Aún no hay pagos registrados' })}
        </div>
      </div>

      {/* Plans modal */}
      {showPlans && (
        <PlansModal
          locale={locale}
          plans={plans}
          currentPlan={currentPlanName}
          onClose={() => setShowPlans(false)}
          onSelectPlan={handleSelectPlan}
          loading={changingPlan}
        />
      )}

      {/* Cancel confirmation */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-bg-card border border-border/50 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-text-primary mb-2">{t('cancelSubscription')}</h3>
            <p className="text-sm text-text-secondary mb-6">{t('cancelConfirm')}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-bg-surface hover:bg-bg-card text-text-primary rounded-xl text-sm font-medium transition-colors border border-border/50"
              >
                Mantener suscripción
              </button>
              <button
                onClick={handleCancelSubscription}
                className="flex-1 px-4 py-2.5 bg-error/20 hover:bg-error/30 text-error rounded-xl text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}