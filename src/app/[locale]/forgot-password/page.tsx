import ForgotPasswordForm from '@/app/components/auth/ForgotPasswordForm';

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' }
  ];
}

export default function ForgotPasswordPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  
  return <ForgotPasswordForm locale={locale} />;
}