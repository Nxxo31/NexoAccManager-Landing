import DashboardContent from '@/app/components/dashboard/DashboardContent';
import Link from 'next/link';

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' },
  ];
}

export default function DashboardPage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <DashboardContent params={{ locale: params.locale }} />
    </div>
  );
}