import React from 'react';
import { Bell, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../../../stores/userStore';
import { NotificationPanel } from '../Notifications/NotificationPanel';

export function TopBar() {
  const { user } = useUserStore();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(0);

  // Fetch unread notifications count
  React.useEffect(() => {
    if (user?.isAdmin) {
      // Implement API call to get unread count
      setUnreadCount(2); // Mock data
    }
  }, [user]);

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {user?.isAdmin && (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-400 hover:text-white"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <NotificationPanel onClose={() => setShowNotifications(false)} />
                )}
              </AnimatePresence>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-white font-medium">{user?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}