import SettingsContent from '@/app/components/dashboard/SettingsContent';

export const dynamic = 'force-dynamic';

export default function SettingsPage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <SettingsContent params={{ locale: params.locale }} />
    </div>
  );
}