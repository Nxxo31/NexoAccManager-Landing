import type { ReactElement } from 'react';

// Mock data for billing
const mockBillingData = {
  paymentHistory: [
    { date: '2026-06-15', amount: '$10.00', status: 'Pagado' },
    { date: '2026-05-15', amount: '$10.00', status: 'Pagado' },
    { date: '2026-04-15', amount: '$10.00', status: 'Pagado' },
  ],
  currentPlan: 'Pro',
  planPrice: '$10.00/mes',
};

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' },
  ];
}

export default function BillingPage({
  params,
}: {
  params: { locale: string };
}): ReactElement {
  const locale = params.locale;

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        billing: 'Facturación',
        paymentHistory: 'Historial de pagos',
        date: 'Fecha',
        amount: 'Monto',
        status: 'Estado',
        paid: 'Pagado',
        pending: 'Pendiente',
        failed: 'Fallido',
        currentPlan: 'Plan actual',
        planPrice: 'Precio del plan',
        changePlan: 'Cambiar plan',
        renews: 'Se renueva el',
        nextPayment: 'Próximo pago',
      },
      en: {
        billing: 'Billing',
        paymentHistory: 'Payment History',
        date: 'Date',
        amount: 'Amount',
        status: 'Status',
        paid: 'Paid',
        pending: 'Pending',
        failed: 'Failed',
        currentPlan: 'Current Plan',
        planPrice: 'Plan Price',
        changePlan: 'Change Plan',
        renews: 'Renews on',
        nextPayment: 'Next Payment',
      },
      pt: {
        billing: 'Cobrança',
        paymentHistory: 'Histórico de pagamentos',
        date: 'Data',
        amount: 'Valor',
        status: 'Status',
        paid: 'Pago',
        pending: 'Pendente',
        failed: 'Falhou',
        currentPlan: 'Plano atual',
        planPrice: 'Preço do plano',
        changePlan: 'Alterar plano',
        renews: 'Renova em',
        nextPayment: 'Próximo pagamento',
      },
    };
    return translations[locale]?.[key] ?? key;
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary p-6">
      <h1 className="mb-6 text-3xl font-bold">{t('billing')}</h1>
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{t('currentPlan')}</h2>
        <p className="mb-2">
          <span className="font-medium">{mockBillingData.currentPlan}</span> -{' '}
          <span className="text-accent">{mockBillingData.planPrice}</span>
        </p>
        <button className="px-4 py-2 bg-accent hover:bg-accent-light rounded-xl text-text-primary transition-colors">
          {t('changePlan')}
        </button>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{t('paymentHistory')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-bg-card rounded-xl">
            <thead>
              <tr className="bg-bg-surface">
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary">{t('date')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary">{t('amount')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-surface">
              {mockBillingData.paymentHistory.map((payment, index) => (
                <tr key={index} className="hover:bg-bg-surface/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === 'Pagado'
                          ? 'bg-success/20 text-success'
                          : payment.status === 'Pendiente'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-error/20 text-error'
                      }`}
                    >
                      {t(payment.status.toLowerCase())}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">{t('nextPayment')}</h2>
        <p className="text-lg">
          {t('renews')} <span className="ml-2 font-medium">2026-07-15</span>
        </p>
      </div>
    </div>
  );
}
