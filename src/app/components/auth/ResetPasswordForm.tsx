'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/app/lib/api';

interface ResetPasswordFormProps {
  locale: string;
  token: string;
}

export default function ResetPasswordForm({ locale, token }: ResetPasswordFormProps) {
  const t = useTranslations('auth.resetPassword');
  const router = useRouter();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!password || !confirmPassword) {
      setError(t('errors.requiredFields') || 'Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError(t('errors.passwordMismatch') || 'Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError(t('errors.passwordTooShort') || 'Password must be at least 8 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await apiFetch('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
      });

      if (!result.success) {
        setError(result.error || t('errors.resetFailed') || 'Password reset failed. Please try again.');
        return;
      }

      setSuccess(t('messages.resetSuccess') || 'Your password has been reset successfully. You can now log in with your new password.');
      setPassword('');
      setConfirmPassword('');
      
      setTimeout(() => {
        router.push(`/${locale}/login`);
      }, 3000);
    } catch (err: any) {
      setError(err.message || t('errors.resetFailed') || 'Password reset failed. Please try again.');
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
              <label htmlFor="password" className="sr-only">
                {t('password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('password')}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                {t('confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('confirmPassword')}
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
