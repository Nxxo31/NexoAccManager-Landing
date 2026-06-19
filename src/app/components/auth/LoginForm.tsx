'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { apiFetch, setAccessToken } from '@/app/lib/api';

interface LoginFormProps {
  locale: string;
}

export default function LoginForm({ locale }: LoginFormProps) {
  const t = useTranslations('auth.login');
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError(t('errors.requiredFields') || 'Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await apiFetch<{ accessToken: string; refreshToken: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!result.success) {
        setError(result.error || t('errors.loginFailed') || 'Invalid email or password');
        return;
      }

      setAccessToken(result.data!.accessToken);
      router.push(`/${locale}/dashboard`);
    } catch (err: any) {
      setError(err.message || t('errors.loginFailed') || 'Invalid email or password');
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
            <div>
              <label htmlFor="password" className="sr-only">
                {t('password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('password')}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {t('forgotPassword')}
              <Link
                href={`/${locale}/forgot-password`}
                className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
              >
                {t('forgotPassword')}
              </Link>
            </div>
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
          </div>

          <div className="mt-6">
            <div className="text-sm">
              {t('dontHaveAccount')}
              <Link
                href={`/${locale}/register`}
                className="font-medium text-primary hover:text-primary/90 transition-colors ml-1"
              >
                {t('register')}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
