import BillingContent from '@/app/components/dashboard/BillingContent';

export const dynamic = 'force-dynamic';

export default function BillingPage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <BillingContent params={{ locale: params.locale }} />
    </div>
  );
}