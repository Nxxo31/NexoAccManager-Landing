import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const localeStr = typeof locale === 'string' ? locale : 'es';
  return {
    locale: localeStr,
    messages: (await import(`./src/app/messages/${localeStr}.json`)).default,
  };
});