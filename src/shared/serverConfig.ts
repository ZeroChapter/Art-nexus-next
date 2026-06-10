const DEFAULT_PUBLIC_URL = 'https://art-nexus.ru';

export const SERVER_URL =
  process.env.API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  DEFAULT_PUBLIC_URL;
