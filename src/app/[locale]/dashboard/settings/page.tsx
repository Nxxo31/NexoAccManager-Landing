import SettingsContent from '@/app/components/dashboard/SettingsContent';

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' },
  ];
}

export default function SettingsPage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <SettingsContent params={{ locale: params.locale }} />
    </div>
  );
}