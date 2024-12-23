import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface RoleCardProps {
  role: string;
  permissions: string[];
  modulePermission: string;
}

export function RoleCard({ role, permissions, modulePermission }: RoleCardProps) {
  const hasPermission = permissions.includes(modulePermission);

  return (
    <td className="px-6 py-4 whitespace-nowrap text-center">
      {hasPermission ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-500 mx-auto" />
      )}
    </td>
  );
}