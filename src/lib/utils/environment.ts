const PRODUCTION_DOMAIN = 'superb-gelato-e258d0.netlify.app';
const LOCAL_DOMAIN = 'localhost:5173';

export function getEnvironmentUrls() {
  const isProd = typeof window !== 'undefined' && window.location.hostname === PRODUCTION_DOMAIN;
  const domain = isProd ? PRODUCTION_DOMAIN : LOCAL_DOMAIN;
  const protocol = isProd ? 'https' : 'http';
  const baseUrl = `${protocol}://${domain}`;

  return {
    baseUrl,
    callbackUrl: `${baseUrl}/callback`,
    logoutUrl: baseUrl,
  };
}