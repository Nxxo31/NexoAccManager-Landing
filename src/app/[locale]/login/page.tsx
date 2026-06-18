import LoginForm from '@/app/components/auth/LoginForm';

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' }
  ];
}

export default function LoginPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  
  return <LoginForm locale={locale} />;
}