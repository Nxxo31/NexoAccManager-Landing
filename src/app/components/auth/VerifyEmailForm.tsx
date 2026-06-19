'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/app/lib/api';

interface VerifyEmailFormProps {
  locale: string;
  token: string;
}

export default function VerifyEmailForm({ locale, token }: VerifyEmailFormProps) {
  const t = useTranslations('auth.verifyEmail');
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const result = await apiFetch('/auth/verify-email', {
          method: 'POST',
          body: JSON.stringify({ token }),
        });

        if (!result.success) {
          setError(result.error || t('errors.verificationFailed') || 'Verification failed. Invalid or expired token.');
          return;
        }

        setVerified(true);
      } catch (err: any) {
        setError(err.message || t('errors.verificationFailed') || 'Verification failed. Invalid or expired token.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [locale, token, t]);

  if (loading) {
    return (
      <main className="min-h-screen bg-dark flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-extrabold text-primary">
            {t('title')}
          </h2>
          <p className="mb-6 text-sm text-secondary/60">
            {t('subtitle')}
          </p>
          <div className="flex items-center justify-center">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></span>
          </div>
        </div>
      </main>
    );
  }

  if (verified) {
    return (
      <main className="min-h-screen bg-dark flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 bg-green/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-green text-2xl">✓</span>
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-primary">
            {t('verified')}
          </h2>
          <p className="text-sm text-secondary/60 max-w-md">
            {t('messages.verificationSuccess') || 'Your email has been verified successfully. You can now log in to your account.'}
          </p>
          <Link
            href={`/${locale}/login`}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('backToLogin')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 bg-red/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-red text-2xl">✕</span>
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-red">
          {t('title')}
        </h2>
        <p className="text-sm text-red/60 max-w-md">
          {error}
        </p>
        <Link
          href={`/${locale}/login`}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('backToLogin')}
        </Link>
      </div>
    </main>
  );
}
