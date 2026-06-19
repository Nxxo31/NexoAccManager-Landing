import DownloadContent from '@/app/components/dashboard/DownloadContent';

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' },
  ];
}

export default function DownloadPage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <DownloadContent params={{ locale: params.locale }} />
    </div>
  );
}