'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Theme = 'dark' | 'light' | 'roblox-classic' | 'custom';

interface Settings {
  language: string;
  theme: Theme;
  emailNotifications: boolean;
}

const mockUser: Settings = {
  language: 'es',
  theme: 'dark',
  emailNotifications: true,
};

const languages: Record<string, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
};

export default function SettingsContent({ params }: { params: { locale: string } }) {
  const t = useTranslations('dashboard.settings');
  const tTitle = useTranslations('dashboard');
  const pathname = usePathname();
  const locale = params.locale;

  const [settings, setSettings] = useState<Settings>(mockUser);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{tTitle('title')}</h1>
        <p className="text-sm text-text-secondary mt-1">{t('title').toLowerCase()}</p>
      </div>

      {showSuccess && (
        <div className="bg-success/20 border border-success/30 text-success rounded-xl px-4 py-3 my-4 text-sm flex items-center gap-2">
          ✓ {t('saved')}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
        <div className="space-y-5">
          {/* Language */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              {t('language')}
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border/40 bg-bg-surface/60 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/50 transition-colors"
              disabled={isSaving}
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              {t('theme')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-bg-surface/60 transition-all duration-200 hover:bg-bg-card/40 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={(e) => handleChange('theme', e.target.value as Theme)}
                  className="h-4 w-4 text-accent"
                  disabled={isSaving}
                />
                <span>{t('dark')}</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-bg-surface/60 transition-all duration-200 hover:bg-bg-card/40 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={(e) => handleChange('theme', e.target.value as Theme)}
                  className="h-4 w-4 text-accent"
                  disabled={isSaving}
                />
                <span>{t('light')}</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-bg-surface/60 transition-all duration-200 hover:bg-bg-card/40 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="roblox-classic"
                  checked={settings.theme === 'roblox-classic'}
                  onChange={(e) => handleChange('theme', e.target.value as Theme)}
                  className="h-4 w-4 text-accent"
                  disabled={isSaving}
                />
                <span>{t('robloxClassic')}</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-bg-surface/60 transition-all duration-200 hover:bg-bg-card/40 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="custom"
                  checked={settings.theme === 'custom'}
                  onChange={(e) => handleChange('theme', e.target.value as Theme)}
                  className="h-4 w-4 text-accent"
                  disabled={isSaving}
                />
                <span>{t('custom')}</span>
                <span className="ml-2 text-xs text-text-secondary">(Enterprise)</span>
              </label>
            </div>
          </div>

          {/* Email notifications */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="email-notifications"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                className="h-4 w-4 text-accent"
                disabled={isSaving}
              />
              <label htmlFor="email-notifications" className="ml-3 text-sm font-medium text-text-primary">
                {t('emailNotifications')}
              </label>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              Recibir notificaciones por correo sobre pagos, actividad y actualizaciones
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full px-5 py-2.5 bg-accent hover:bg-accent-light text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9h0c-5.302 0-9.614 4.283-9.614 9.614v.057c0 3.041 1.735 5.564 4.03 7.367a7.508 7.508 0 005.764 2.997" />
                </svg>
                <span>{t('saving')}</span>
              </>
            ) : (
              t('saveChanges')
            )}
          </button>
        </div>
      </form>
    </div>
  );
}