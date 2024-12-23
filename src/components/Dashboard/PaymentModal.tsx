import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Toast } from '../UI/Toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdrawal';
}

export function PaymentModal({ isOpen, onClose, type }: PaymentModalProps) {
  const [paymentType, setPaymentType] = React.useState<'once' | 'monthly'>('once');
  const [amount, setAmount] = React.useState('');
  const [showToast, setShowToast] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    console.log({ paymentType, amount });
    setShowToast(true);
    // Close modal after a delay
    setTimeout(() => {
      onClose();
      setAmount('');
      setPaymentType('once');
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative z-50"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold mb-4">
                {type === 'deposit' ? 'Einzahlungsauftrag' : 'Auszahlungsauftrag'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {type === 'deposit' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zahlungsart
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentType('once')}
                        className={`px-4 py-2 rounded-lg border ${
                          paymentType === 'once'
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        Einmalzahlung
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentType('monthly')}
                        className={`px-4 py-2 rounded-lg border ${
                          paymentType === 'monthly'
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        Monatlich
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Betrag (€)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-2 px-4 rounded-lg text-white ${
                    type === 'deposit'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Bestätigen
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Toast
        message="Auftrag wird bearbeitet"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}