import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getEnvironmentUrls } from '../../lib/utils/environment';

interface UserMenuProps {
  isTransparent?: boolean;
}

export function UserMenu({ isTransparent = false }: UserMenuProps) {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const { logoutUrl } = getEnvironmentUrls();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: logoutUrl
      }
    });
  };

  const goToDashboard = () => {
    navigate('/dashboard');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
          isTransparent
            ? 'text-white hover:bg-white/20'
            : 'text-gray-900 hover:bg-gray-100'
        }`}
      >
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user.name || 'User'}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <User className="w-6 h-6" />
        )}
        <span>{user?.name}</span>
      </motion.button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={goToDashboard}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="w-4 h-4 mr-2" />
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}