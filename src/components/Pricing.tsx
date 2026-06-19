'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const planKeys = ['free', 'starter', 'pro', 'business', 'enterprise'] as const;

export default function Pricing() {
  const t = useTranslations('landing.pricing');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleCheckout = async (planName: string) => {
    try {
      const res = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planName }),
      });

      if (!res.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error al crear la sesión de pago. Por favor, intenta nuevamente.');
    }
  };

  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}{' '}
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 glass rounded-full px-4 py-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {t('monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'annual'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {t('annual')} <span className="text-xs text-green-400">{t('annualDiscount')}</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {planKeys.map((planKey) => {
            const features = t.raw(`plans.${planKey}.features`) as string[];
            const isHighlighted = planKey === 'starter';
            const price = planKey === 'free' ? 0 : planKey === 'starter' ? 5 : planKey === 'pro' ? 10 : planKey === 'business' ? 20 : 50;

            return (
              <div
                key={planKey}
                className={`glass p-6 flex flex-col transition-all hover:scale-[1.02] ${
                  isHighlighted ? 'border-primary/50 shadow-lg shadow-primary/10' : ''
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{t(`plans.${planKey}.name`)}</h3>
                  <p className="text-text-secondary text-sm">{t(`plans.${planKey}.description`)}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">${price}</span>
                  <span className="text-text-secondary">{t('perMonth')}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-400 flex-shrink-0">✓</span>
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleCheckout(t.raw(`plans.${planKey}.name`) as string)}
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-all ${
                    isHighlighted
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-bg-surface border border-border hover:border-primary'
                  }`}
                >
                  {t(`plans.${planKey}.cta`)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}