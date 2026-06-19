import BillingContent from '@/app/components/dashboard/BillingContent';

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' },
  ];
}

export default function BillingPage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <BillingContent params={{ locale: params.locale }} />
    </div>
  );
}