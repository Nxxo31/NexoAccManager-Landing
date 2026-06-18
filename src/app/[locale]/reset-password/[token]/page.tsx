import ResetPasswordForm from '@/app/components/auth/ResetPasswordForm';

export function generateStaticParams() {
  return [
    { locale: 'es', token: 'dummy' },
    { locale: 'en', token: 'dummy' },
    { locale: 'pt', token: 'dummy' }
  ];
}

export default function ResetPasswordPage({
  params,
}: {
  params: { locale: string; token: string };
}) {
  const locale = params.locale;
  const token = params.token;
  
  return <ResetPasswordForm locale={locale} token={token} />;
}