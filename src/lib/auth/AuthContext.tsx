import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthState, User } from './types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  enableTwoFactor: () => Promise<void>;
  verifyTwoFactor: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'LOGOUT' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { 
    isAuthenticated, 
    user, 
    loginWithRedirect, 
    logout: auth0Logout,
    isLoading: auth0Loading,
  } = useAuth0();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: auth0Loading });
  }, [auth0Loading]);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch({
        type: 'SET_USER',
        payload: {
          id: user.sub!,
          email: user.email!,
          name: user.name,
          avatar: user.picture,
          emailVerified: user.email_verified!,
          twoFactorEnabled: false,
        },
      });
    }
  }, [isAuthenticated, user]);

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await loginWithRedirect({
        authorizationParams: {
          login_hint: email,
          prompt: rememberMe ? 'none' : undefined,
        },
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to login' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth0Logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to logout' });
      throw error;
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup',
          login_hint: email,
        },
        appState: {
          name,
        },
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to register' });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Implement password reset logic
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to reset password' });
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      // Implement password update logic
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update password' });
      throw error;
    }
  };

  const enableTwoFactor = async () => {
    try {
      // Implement 2FA enable logic
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to enable 2FA' });
      throw error;
    }
  };

  const verifyTwoFactor = async (code: string) => {
    try {
      // Implement 2FA verification logic
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to verify 2FA code' });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        resetPassword,
        updatePassword,
        enableTwoFactor,
        verifyTwoFactor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}