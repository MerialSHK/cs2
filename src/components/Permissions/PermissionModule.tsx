import React from 'react';
import { motion } from 'framer-motion';
import { RoleCard } from './RoleCard';

interface PermissionModuleProps {
  module: string;
  type: string;
  roles: {
    name: string;
    permissions: {
      [key: string]: string[];
    };
  }[];
}

export function PermissionModule({ module, type, roles }: PermissionModuleProps) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 capitalize">
          {module} - {type}
        </div>
      </td>
      {roles.map((role) => (
        <RoleCard
          key={`${role.name}-${module}-${type}`}
          role={role.name}
          permissions={role.permissions[module]}
          modulePermission={type}
        />
      ))}
    </motion.tr>
  );
}