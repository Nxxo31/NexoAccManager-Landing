'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Mock data — replaces with real API calls when backend is ready
const mockBilling = {
  currentPlan: 'Pro',
  planPrice: '$10.00/mes',
  nextPayment: '15/07/2026',
  paymentHistory: [
    { date: '15/06/2026', amount: '$10.00', status: 'paid' as const },
    { date: '15/05/2026', amount: '$10.00', status: 'paid' as const },
    { date: '15/04/2026', amount: '$10.00', status: 'paid' as const },
  ],
};

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

function PlansModal({ locale, onClose }: { locale: string; onClose: () => void }) {
  const t = useTranslations('dashboard.billing');
  const plans = [
    { name: 'Free', price: '$0/mes', accounts: '5 cuentas', highlight: false },
    { name: 'Starter', price: '$5/mes', accounts: '10 cuentas', highlight: false },
    { name: 'Pro', price: '$10/mes', accounts: '20 cuentas', highlight: true },
    { name: 'Business', price: '$20/mes', accounts: '30 cuentas', highlight: false },
    { name: 'Enterprise', price: '$50/mes', accounts: '∞ cuentas', highlight: false },
  ];

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
          {plans.map((plan) => (
            <button
              key={plan.name}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                plan.highlight
                  ? 'bg-accent/10 border-accent/40 text-text-primary'
                  : 'bg-bg-surface/50 border-border/40 text-text-secondary hover:border-border/70 hover:text-text-primary'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{plan.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{plan.accounts}</p>
                </div>
                <span className={`font-semibold ${plan.highlight ? 'text-accent' : 'text-text-primary'}`}>
                  {plan.price}
                </span>
              </div>
            </button>
          ))}
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

export default function BillingContent({ params }: { params: { locale: string } }) {
  const t = useTranslations('dashboard.billing');
  const tTitle = useTranslations('dashboard');
  const pathname = usePathname();
  const locale = params.locale;
  const [showPlans, setShowPlans] = React.useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = React.useState(false);

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
            <p className="text-2xl font-bold text-text-primary">{mockBilling.currentPlan}</p>
            <p className="text-accent font-semibold text-sm mt-1">{mockBilling.planPrice}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <button
              onClick={() => setShowPlans(true)}
              className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-accent/20"
            >
              {t('changePlan')}
            </button>
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="px-4 py-2 text-xs text-text-secondary hover:text-error transition-colors"
            >
              {t('cancelSubscription')}
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-sm text-text-secondary">
            {t('nextPayment')}: <span className="font-medium text-text-primary">{t('renewsOn')} {mockBilling.nextPayment}</span>
          </p>
        </div>
      </div>

      {/* Payment history */}
      <div className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="text-base font-semibold text-text-primary">{t('paymentHistory')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-surface/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">{t('date')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">{t('amount')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {mockBilling.paymentHistory.map((payment, i) => (
                <tr key={i} className="hover:bg-bg-surface/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-text-primary whitespace-nowrap">{payment.date}</td>
                  <td className="px-6 py-4 text-sm text-text-primary whitespace-nowrap">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={payment.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plans modal */}
      {showPlans && <PlansModal locale={locale} onClose={() => setShowPlans(false)} />}

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
                onClick={() => setShowCancelConfirm(false)}
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

import React from 'react';