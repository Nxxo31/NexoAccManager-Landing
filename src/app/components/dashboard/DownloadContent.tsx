'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type OS = 'windows' | 'mac' | 'linux';

const MOCK_VERSION = 'v1.0.0';
const MOCK_RELEASE = '2026-06-01';

function OSSelector({ active, onSelect }: { active: OS; onSelect: (os: OS) => void }) {
  const t = useTranslations('dashboard.download');
  const osList: OS[] = ['windows', 'mac', 'linux'];
  const labels: Record<OS, string> = {
    windows: t('windows'),
    mac: t('mac'),
    linux: t('linux'),
  };
  const icons: Record<OS, string> = {
    windows: '⊞',
    mac: '⊛',
    linux: '⊖',
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {osList.map((os) => {
        const isActive = active === os;
        return (
          <button
            key={os}
            onClick={() => onSelect(os)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
              isActive
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'bg-bg-surface/50 border-border/40 text-text-secondary hover:border-border/70 hover:text-text-primary'
            }`}
          >
            <span className="text-2xl">{icons[os]}</span>
            <span className="text-sm font-medium">{labels[os]}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function DownloadContent({ params }: { params: { locale: string } }) {
  const t = useTranslations('dashboard.download');
  const tTitle = useTranslations('dashboard');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const [selectedOS, setSelectedOS] = useState<OS>('windows');

  const stepsKey = `steps${selectedOS.charAt(0).toUpperCase() + selectedOS.slice(1)}` as
    | 'stepsWindows'
    | 'stepsMac'
    | 'stepsLinux';
  const steps = t.raw(stepsKey) as Record<string, string>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('title')}</h1>
        <p className="text-sm text-text-secondary mt-1">{t('subtitle')}</p>
      </div>

      {/* Version info */}
      <div className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{t('version')}</p>
            <p className="text-xl font-bold text-text-primary">{MOCK_VERSION}</p>
            <p className="text-xs text-text-secondary mt-1">{t('releaseDate')}: {MOCK_RELEASE}</p>
          </div>
          <a
            href="https://github.com/Nexo31/NexoAccManager/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-xl font-semibold transition-colors shadow-lg shadow-accent/20 text-sm"
          >
            <span>⬇</span>
            {t('downloadBtn', { os: selectedOS.toUpperCase() })}
          </a>
        </div>
      </div>

      {/* OS selector */}
      <div className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-text-primary mb-4">{t('selectOS')}</h2>
        <OSSelector active={selectedOS} onSelect={setSelectedOS} />
      </div>

      {/* Requirements */}
      <div className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-text-primary mb-4">{t('reqs')}</h2>
        <p className="text-sm text-text-secondary">
          {t.raw('reqsList') && (t.raw('reqsList') as Record<string, string>)[selectedOS]}
        </p>
      </div>

      {/* Installation steps */}
      <div className="bg-bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-text-primary mb-4">{t('installGuide')}</h2>
        <ol className="space-y-3">
          {steps && Object.entries(steps).map(([num, step]) => (
            <li key={num} className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                {num}
              </span>
              <span className="text-sm text-text-secondary leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}