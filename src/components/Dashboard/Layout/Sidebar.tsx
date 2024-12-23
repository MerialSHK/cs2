import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Users,
  Shield,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { useUserStore } from '../../../stores/userStore';

export function Sidebar() {
  const { isAdmin } = useUserStore();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Briefcase, label: 'Workingspace', path: '/dashboard/investments' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const adminItems = [
    { icon: Users, label: 'User Management', path: '/dashboard/admin/users' },
    { icon: Shield, label: 'Permissions', path: '/dashboard/admin/permissions' },
    { icon: DollarSign, label: 'Working Management', path: '/dashboard/admin/investments' },
  ];

  return (
    <div className="w-64 bg-gray-900 min-h-screen p-4">
      <div className="space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {isAdmin && (
          <>
            <div className="border-t border-gray-800 my-4" />
            <div className="text-sm text-gray-400 px-3 mb-2">Admin</div>
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </>
        )}
      </div>
    </div>
  );
}