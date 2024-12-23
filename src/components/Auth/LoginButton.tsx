import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

export function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogin}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary hover:bg-secondary text-white transition-colors duration-200"
    >
      <LogIn className="w-4 h-4" />
      <span>Log in</span>
    </motion.button>
  );
}