import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { LoginButton } from '../Auth/LoginButton';
import { Globe } from 'lucide-react';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isTransparent, setIsTransparent] = React.useState(true);
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
  };

  React.useEffect(() => {
    if (location.pathname === '/') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsTransparent(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        observer.observe(heroSection);
      }

      return () => {
        if (heroSection) {
          observer.unobserve(heroSection);
        }
      };
    } else {
      setIsTransparent(false);
    }
  }, [location.pathname]);

  // Don't show header on dashboard routes
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isTransparent 
          ? 'bg-transparent' 
          : 'bg-white shadow-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end h-24 space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isTransparent
                ? 'text-white hover:bg-white/20'
                : 'text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{(i18n.language || 'en').toUpperCase()}</span>
          </motion.button>
          <LoginButton />
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isTransparent
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-primary hover:bg-secondary text-white'
            }`}
          >
            <span>{t('auth.register')}</span>
          </motion.a>
        </div>
      </div>
    </header>
  );
}