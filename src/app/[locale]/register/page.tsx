import RegisterForm from '@/app/components/auth/RegisterForm';

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'pt' }
  ];
}

export default function RegisterPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  
  return <RegisterForm locale={locale} />;
}