import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Eye, Globe } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        <div className="space-y-8">
          {/* Notifications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-gray-400" />
                <h3 className="text-lg font-medium">Notifications</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>SMS Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-gray-400" />
                <h3 className="text-lg font-medium">Security</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Two-Factor Authentication</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Enable
                </motion.button>
              </div>
              <div className="flex items-center justify-between">
                <span>Change Password</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Update
                </motion.button>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-gray-400" />
                <h3 className="text-lg font-medium">Privacy</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Profile Visibility</span>
                <select className="rounded-lg border-gray-300">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Friends Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Language and Region */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6 text-gray-400" />
                <h3 className="text-lg font-medium">Language & Region</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Language</span>
                <select className="rounded-lg border-gray-300">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Time Zone</span>
                <select className="rounded-lg border-gray-300">
                  <option>UTC+00:00</option>
                  <option>UTC+01:00</option>
                  <option>UTC+02:00</option>
                  <option>UTC+03:00</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}