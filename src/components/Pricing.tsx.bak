'use client';

import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Para empezar',
    features: [
      '5 cuentas Roblox',
      'Server Browser',
      'Dark Theme',
      'Soporte por Discord',
    ],
    cta: 'Empezar gratis',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: 5,
    description: 'Para entusiastas',
    features: [
      '10 cuentas Roblox',
      'Auto Cookie Refresh',
      'Presence Dashboard',
      'Light Theme',
      'Soporte por email',
    ],
    cta: 'Elegir Starter',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: 10,
    description: 'Para profesionales',
    features: [
      '20 cuentas Roblox',
      'Smart Server Selection',
      'Player Finder',
      '3 temas (Dark/Light/Roblox)',
      'Soporte prioritario',
    ],
    cta: 'Elegir Pro',
    highlighted: false,
  },
  {
    name: 'Business',
    price: 20,
    description: 'Para equipos',
    features: [
      '30 cuentas Roblox',
      'Account Control Panel completo',
      'Dashboard Web',
      'API REST local',
      'Soporte prioritario 24h',
    ],
    cta: 'Elegir Business',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 50,
    description: 'Sin límites',
    features: [
      'Cuentas ilimitadas',
      'Custom Themes',
      'Soporte dedicado',
      'SLA garantizado',
      'Onboarding personalizado',
    ],
    cta: 'Contactar',
    highlighted: false,
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planes <span className="gradient-text">transparentes</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Elige el plan que se adapte a tus necesidades. Sin sorpresas, sin compromiso.
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
              Mensual
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'annual'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              Anual <span className="text-xs text-green-400">-20%</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass p-6 flex flex-col transition-all hover:scale-[1.02] ${
                plan.highlighted
                  ? 'border-primary/50 shadow-lg shadow-primary/10'
                  : ''
              }`}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-text-secondary text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-text-secondary">/mes</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span className="text-green-400 flex-shrink-0">✓</span>
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`block w-full text-center py-3 rounded-lg font-medium transition-all ${
                  plan.highlighted
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-bg-surface border border-border hover:border-primary'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}