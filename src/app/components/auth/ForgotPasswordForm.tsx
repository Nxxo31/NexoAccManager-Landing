'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

interface ForgotPasswordFormProps {
  locale: string;
}

export default function ForgotPasswordForm({ locale }: ForgotPasswordFormProps) {
  const t = useTranslations('auth.forgotPassword');
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!email) {
      setError(t('errors.requiredFields') || 'Please enter your email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('errors.invalidEmail') || 'Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(t('messages.resetEmailSent') || 'If an account exists with that email, you will receive a password reset link shortly.');
      setEmail('');
    } catch (err: any) {
      setError(err.message || t('errors.emailFailed') || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            {t('title')}
          </h2>
          <p className="mt-2 text-center text-sm text-secondary/60">
            {t('submit')}
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red/20 border border-red/40 text-red rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-4 bg-green/20 border border-green/40 text-green rounded-md">
            {success}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                {t('email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email')}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></span>
              ) : (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={loading}
                >
                  {t('submit')}
                </button>
              )}
            </div>
            <div className="text-sm">
              {t('backToLogin')}
              <Link
                href={`/${locale}/login`}
                className="font-medium text-primary hover:text-primary/90 transition-colors ml-1"
              >
                {t('login')}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
