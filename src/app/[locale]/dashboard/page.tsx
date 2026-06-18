import type { ReactElement } from 'react';

// Mock data for the dashboard
const mockUserData = {
  plan: 'Pro',
  accountUsage: { current: 12, limit: 20 },
  nextPayment: '2026-07-15',
  email: 'user@example.com',
};

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' },
  ];
}

export default function DashboardPage({
  params,
}: {
  params: { locale: string };
}): ReactElement {
  const locale = params.locale;

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        dashboard: 'Panel de control',
        plan: 'Plan',
        usage: 'Uso de cuentas',
        nextPayment: 'Próximo pago',
        billing: 'Facturación',
        download: 'Descarga',
        settings: 'Ajustes',
        currentPlan: 'Plan actual',
        accountsUsed: 'Cuentas usadas',
        of: 'de',
        renews: 'Se renueva el',
        goToBilling: 'Ir a facturación',
        goToDownload: 'Ir a descarga',
        goToSettings: 'Ir a ajustes',
      },
      en: {
        dashboard: 'Dashboard',
        plan: 'Plan',
        usage: 'Account Usage',
        nextPayment: 'Next Payment',
        billing: 'Billing',
        download: 'Download',
        settings: 'Settings',
        currentPlan: 'Current Plan',
        accountsUsed: 'Accounts Used',
        of: 'of',
        renews: 'Renews on',
        goToBilling: 'Go to Billing',
        goToDownload: 'Go to Download',
        goToSettings: 'Go to Settings',
      },
      pt: {
        dashboard: 'Painel de controle',
        plan: 'Plano',
        usage: 'Uso de contas',
        nextPayment: 'Próximo pagamento',
        billing: 'Cobrança',
        download: 'Download',
        settings: 'Configurações',
        currentPlan: 'Plano atual',
        accountsUsed: 'Contas usadas',
        of: 'de',
        renews: 'Renova em',
        goToBilling: 'Ir para cobrança',
        goToDownload: 'Ir para download',
        goToSettings: 'Ir para configurações',
      },
    };
    return translations[locale]?.[key] ?? key;
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary p-6">
      <h1 className="mb-6 text-3xl font-bold">{t('dashboard')}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Plan Card */}
        <div className="bg-bg-card rounded-xl p-6">
          <h2 className="mb-4 text-lg font-semibold">{t('currentPlan')}</h2>
          <p className="text-2xl font-bold">{mockUserData.plan}</p>
        </div>
        {/* Usage Card */}
        <div className="bg-bg-card rounded-xl p-6">
          <h2 className="mb-4 text-lg font-semibold">{t('usage')}</h2>
          <p className="text-2xl font-bold">
            {mockUserData.accountUsage.current} {t('of')} {mockUserData.accountUsage.limit}
          </p>
          <div className="mt-2 w-full bg-bg-surface rounded-h-full h-2.5">
            <div
              className="bg-accent rounded-h-full h-2.5"
              style={{
                width: `${(mockUserData.accountUsage.current / mockUserData.accountUsage.limit) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        {/* Next Payment Card */}
        <div className="bg-bg-card rounded-xl p-6">
          <h2 className="mb-4 text-lg font-semibold">{t('nextPayment')}</h2>
          <p className="text-2xl font-bold">
            {t('renews')} <span className="ml-2">{mockUserData.nextPayment}</span>
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row sm:gap-4">
        <a
          href={`/${locale}/dashboard/billing`}
          className="w-full sm:w-auto px-6 py-3 bg-accent hover:bg-accent-light rounded-xl text-text-primary transition-colors"
        >
          {t('goToBilling')}
        </a>
        <a
          href={`/${locale}/dashboard/download`}
          className="w-full sm:w-auto px-6 py-3 bg-bg-surface hover:bg-bg-card rounded-xl text-text-primary transition-colors border border-border"
        >
          {t('goToDownload')}
        </a>
        <a
          href={`/${locale}/dashboard/settings`}
          className="w-full sm:w-auto px-6 py-3 bg-bg-surface hover:bg-bg-card rounded-xl text-text-primary transition-colors border border-border"
        >
          {t('goToSettings')}
        </a>
      </div>
    </div>
  );
}
