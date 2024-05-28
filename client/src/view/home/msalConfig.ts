import { PublicClientApplication } from '@azure/msal-browser';
import { config } from '../../Config';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: config.appId!,
    redirectUri: config.redirectUrl!.toString(),
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
});