'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { apiFetch, clearAccessToken } from '@/app/lib/api';
import { useRouter } from 'next/navigation';

type Theme = 'dark' | 'light' | 'roblox-classic' | 'custom';

interface UserSettings {
  id: string;
  email: string;
  name: string | null;
  language: string;
}

const languages: Record<string, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
};

export default function SettingsContent({ params }: { params: { locale: string } }) {
  const t = useTranslations('dashboard.settings');
  const tTitle = useTranslations('dashboard');
  const router = useRouter();
  const locale = params.locale;

  const [user, setUser] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savingField, setSavingField] = useState<string | null>(null);

  const [selectedLanguage, setSelectedLanguage] = useState('es');

  useEffect(() => {
    (async () => {
      const result = await apiFetch<UserSettings>('/auth/me');
      if (result.success) {
        setUser(result.data!);
        setSelectedLanguage(result.data!.language || 'es');
      }
      setLoading(false);
    })();
  }, []);

  const handleLanguageChange = async (lang: string) => {
    setSelectedLanguage(lang);
    setSavingField('language');
    setIsSaving(true);
    setError(null);

    const result = await apiFetch<UserSettings>('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify({ language: lang }),
    });

    setIsSaving(false);
    setSavingField(null);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setError(result.error || 'Error saving');
    }
  };

  const handleLogout = async () => {
    clearAccessToken();
    router.push(`/${locale}/login`);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-error mb-4">{error || 'Not authenticated'}</p>
        <a href={`/${locale}/login`} className="text-accent hover:underline">
          {t('signIn', { default: 'Sign in' })}
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{tTitle('title')}</h1>
        <p className="text-sm text-text-secondary mt-1">{t('title').toLowerCase()}</p>
      </div>

      {showSuccess && (
        <div className="bg-success/20 border border-success/30 text-success rounded-xl px-4 py-3 text-sm flex items-center gap-2">
          ✓ Cambios guardados
        </div>
      )}

      {error && (
        <div className="bg-error/20 border border-error/30 text-error rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Account info */}
      <div className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4">{t('accountInfo')}</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Email</span>
            <span className="text-text-primary font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Nombre</span>
            <span className="text-text-primary font-medium">{user.name || '—'}</span>
          </div>
        </div>
        <div className="pt-4 border-t border-border/50 mt-4">
          <button
            onClick={handleLogout}
            className="text-sm text-error hover:text-error/80 transition-colors"
          >
            {t('logout', { default: 'Cerrar sesión' })}
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4">{t('language')}</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
            {t('language')}
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border/40 bg-bg-surface/60 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/50 transition-colors"
            disabled={isSaving}
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          {savingField === 'language' && (
            <p className="text-xs text-text-secondary">{t('saving')}</p>
          )}
        </div>
      </div>

      {/* Theme — not editable from landing, info only */}
      <div className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4">{t('theme')}</h2>
        <p className="text-sm text-text-secondary">
          {t('themeNote', { default: 'El tema se configura en la aplicación de escritorio.' })}
        </p>
      </div>
    </div>
  );
}