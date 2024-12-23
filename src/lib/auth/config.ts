import { getEnvironmentUrls } from '../utils/environment';

const { callbackUrl, logoutUrl } = getEnvironmentUrls();

export const auth0Config = {
  domain: 'codersolutions.eu.auth0.com',
  clientId: 'WzAceO34hrVcc4rdGjk0frIjRUlBU81z',
  authorizationParams: {
    redirect_uri: callbackUrl,
    audience: 'https://codersolutions.eu.auth0.com/api/v2/',
    scope: 'openid profile email offline_access',
    response_type: 'code',
  },
};