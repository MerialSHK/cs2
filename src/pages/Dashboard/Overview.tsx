import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export function Overview() {
  const stats = [
    {
      title: 'Total Investment',
      value: '$124,571.00',
      change: '+14.6%',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Contracts Overview',
      value: '23',
      change: '+7.4%',
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      title: 'Performance',
      value: '+18.3%',
      change: '+4.2%',
      icon: Activity,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Users',
      value: '1,482',
      change: '+21.5%',
      icon: Users,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-500 text-sm font-medium">
                  {stat.change}
                </span>
                <span className="text-gray-400 text-sm ml-2">vs last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}