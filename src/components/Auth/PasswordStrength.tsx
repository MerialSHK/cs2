import React from 'react';
import { motion } from 'framer-motion';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const width = (strength / 4) * 100;
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#10b981'];

  return (
    <div className="mt-1">
      <motion.div
        className="h-1 rounded-full bg-gray-200"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            backgroundColor: colors[strength - 1] || '#ef4444',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}