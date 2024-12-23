// src/components/Auth/AuthButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

interface AuthButtonProps {
  isTransparent?: boolean;
}

export function AuthButton({ isTransparent = false }: AuthButtonProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleAuth = async () => {
    if (isAuthenticated) {
      await logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    } else {
      await loginWithRedirect({
        appState: {
          returnTo: window.location.pathname
        },
        authorizationParams: {
          redirect_uri: window.location.origin,
          prompt: 'login'
        }
      });
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleAuth}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
        isTransparent
          ? 'bg-white/10 hover:bg-white/20 text-white'
          : 'bg-primary hover:bg-secondary text-white'
      }`}
    >
      <LogIn className="w-4 h-4" />
      <span className="font-medium">
        {isAuthenticated ? t('auth.logout') : t('auth.login')}
      </span>
    </motion.button>
  );
}
