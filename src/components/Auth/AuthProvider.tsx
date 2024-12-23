import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from '../../lib/auth/config';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <Auth0Provider
      {...auth0Config}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}