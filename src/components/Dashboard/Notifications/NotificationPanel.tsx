import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle, Check } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'deposit',
      user: 'John Doe',
      amount: 1000,
      time: '5 minutes ago',
      isRead: false
    },
    {
      id: 2,
      type: 'withdrawal',
      user: 'Jane Smith',
      amount: 500,
      time: '10 minutes ago',
      isRead: false
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50"
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Benachrichtigungen</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
              notification.isRead ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                notification.type === 'deposit'
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}>
                {notification.type === 'deposit' ? (
                  <ArrowUpCircle className={`w-5 h-5 ${
                    notification.type === 'deposit'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`} />
                ) : (
                  <ArrowDownCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {notification.user} hat einen {
                    notification.type === 'deposit' ? 'Einzahlungs' : 'Auszahlungs'
                  }auftrag erstellt
                </p>
                <p className="text-sm text-gray-600">
                  Betrag: €{notification.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>

              {!notification.isRead && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <Check className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}