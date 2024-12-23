import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus } from 'lucide-react';

const modules = ['users', 'investments', 'reports'];
const permissionTypes = ['create', 'read', 'update', 'delete'];

interface Role {
  name: string;
  permissions: {
    [key: string]: string[];
  };
}

export function Permissions() {
  const [roles, setRoles] = useState<Role[]>([
    {
      name: 'Administrator',
      permissions: {
        users: ['create', 'read', 'update', 'delete'],
        investments: ['create', 'read', 'update', 'delete'],
        reports: ['create', 'read', 'update', 'delete'],
      },
    },
    {
      name: 'Manager',
      permissions: {
        users: ['read', 'update'],
        investments: ['read', 'update'],
        reports: ['read', 'create'],
      },
    },
    {
      name: 'User',
      permissions: {
        users: ['read'],
        investments: ['read'],
        reports: ['read'],
      },
    },
  ]);

  const [selectedRole, setSelectedRole] = useState<string>(roles[0].name);

  const handlePermissionChange = (module: string, type: string, checked: boolean) => {
    setRoles(prevRoles => {
      return prevRoles.map(role => {
        if (role.name === selectedRole) {
          const updatedPermissions = { ...role.permissions };
          if (checked) {
            updatedPermissions[module] = [...(updatedPermissions[module] || []), type];
          } else {
            updatedPermissions[module] = updatedPermissions[module].filter(p => p !== type);
          }
          return { ...role, permissions: updatedPermissions };
        }
        return role;
      });
    });
  };

  const selectedRoleData = roles.find(role => role.name === selectedRole);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Berechtigungen</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Neue Rolle</span>
          </motion.button>
        </div>

        {/* Role Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rolle auswählen
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full md:w-64 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            {roles.map((role) => (
              <option key={role.name} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Permissions Grid */}
        <div className="space-y-6">
          {modules.map((module) => (
            <div key={module} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium capitalize mb-4">{module}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {permissionTypes.map((type) => (
                  <div key={`${module}-${type}`} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`${module}-${type}`}
                      checked={selectedRoleData?.permissions[module]?.includes(type) || false}
                      onChange={(e) => handlePermissionChange(module, type, e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`${module}-${type}`}
                      className="text-sm font-medium text-gray-700 capitalize"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Änderungen speichern
          </motion.button>
        </div>
      </div>
    </div>
  );
}