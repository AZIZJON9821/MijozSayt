import {getRequestConfig} from 'next-intl/server';
import {routing} from './navigation';

export default getRequestConfig(async ({requestLocale}) => {
  // We await the requestLocale since it's a promise in Next.js 15+
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
