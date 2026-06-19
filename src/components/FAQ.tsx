'use client';

import { useTranslations } from 'next-intl';

const faqKeys = [
  { q: 'q1', a: 'a1' },
  { q: 'q2', a: 'a2' },
  { q: 'q3', a: 'a3' },
  { q: 'q4', a: 'a4' },
  { q: 'q5', a: 'a5' },
  { q: 'q6', a: 'a6' },
];

export default function FAQ() {
  const t = useTranslations('landing.faq');

  return (
    <section id="faq" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t('title')}{' '}
          <span className="gradient-text">{t('titleHighlight')}</span>
        </h2>

        <div className="space-y-6">
          {faqKeys.map((item) => (
            <div key={item.q} className="glass p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{t(item.q)}</h3>
                <button
                  className="text-primary hover:text-primary-dark transition-colors"
                  aria-label="Toggle answer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 transition-transform duration-200"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
              <p className="text-text-secondary text-sm">{t(item.a)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}