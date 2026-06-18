import VerifyEmailForm from '@/app/components/auth/VerifyEmailForm';

export function generateStaticParams() {
  return [
    { locale: 'es', token: 'dummy' },
    { locale: 'en', token: 'dummy' },
    { locale: 'pt', token: 'dummy' }
  ];
}

export default function VerifyEmailPage({
  params,
}: {
  params: { locale: string; token: string };
}) {
  const locale = params.locale;
  const token = params.token;
  
  return <VerifyEmailForm locale={locale} token={token} />;
}