import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Plus, Search, Wallet } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  totalInvestments: number;
  coins: {
    name: string;
    amount: number;
  }[];
}

export function InvestmentManagement() {
  const [selectedUser, setSelectedUser] = useState('');
  const [coinName, setCoinName] = useState('');
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Mock users data with coins
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      totalInvestments: 3,
      coins: [
        { name: 'Bitcoin', amount: 0.5 },
        { name: 'Ethereum', amount: 2.3 },
        { name: 'Solana', amount: 15.7 }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      totalInvestments: 2,
      coins: [
        { name: 'Bitcoin', amount: 0.3 },
        { name: 'Ethereum', amount: 1.5 }
      ]
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      totalInvestments: 1,
      coins: [
        { name: 'Bitcoin', amount: 0.1 }
      ]
    }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignCoin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Assigning coin:', {
      userId: selectedUser,
      coinName,
      amount: parseFloat(amount)
    });
    setCoinName('');
    setAmount('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Coins className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Working Management</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Coin zuweisen</span>
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Benutzer suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Assignment Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <form onSubmit={handleAssignCoin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Benutzer auswählen</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="">Benutzer wählen</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Coin Name</label>
                <input
                  type="text"
                  value={coinName}
                  onChange={(e) => setCoinName(e.target.value)}
                  required
                  placeholder="z.B. Bitcoin"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Menge</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  step="0.000001"
                  placeholder="0.00"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Abbrechen
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Coin zuweisen
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Users List */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Benutzer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coins
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {user.coins.map((coin, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Wallet className="w-4 h-4 text-primary" />
                          <span className="text-sm text-gray-900">
                            {coin.name}: {coin.amount.toFixed(6)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}