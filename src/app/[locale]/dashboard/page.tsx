import DashboardContent from '@/app/components/dashboard/DashboardContent';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function DashboardPage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <DashboardContent params={{ locale: params.locale }} />
    </div>
  );
}