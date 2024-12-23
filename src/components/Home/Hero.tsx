import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplineScene } from './SplineScene';
import { CountdownClock } from './CountdownClock';
import { useWelcomeStore } from '../../lib/store/welcomeStore';
import { X } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export function Hero() {
  const { isAuthenticated } = useAuth0();
  const { showWelcome, setShowWelcome, registrationComplete, setRegistrationComplete } = useWelcomeStore();

  useEffect(() => {
    // Check multiple sources for registration completion
    const isRegistrationComplete = 
      registrationComplete || 
      localStorage.getItem('registration_complete') === 'true';

    if (isAuthenticated && isRegistrationComplete) {
      setShowWelcome(true);
      setRegistrationComplete(false);
      localStorage.removeItem('registration_complete');
    }
  }, [isAuthenticated, registrationComplete, setShowWelcome, setRegistrationComplete]);

  return (
    <div id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements remain the same */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_100%)]"></div>
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="absolute inset-0 z-10" style={{ height: '100vh' }}>
        <SplineScene />
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center justify-center pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <CountdownClock />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg mx-4">
              <button
                onClick={() => setShowWelcome(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Welcome! 🎉</h3>
                <p className="mb-3">
                  Thank you for creating your account! 🚀 You're all set and ready to go.
                  The countdown is on, and we're excited to launch soon!
                </p>
                <p className="text-sm text-gray-600">
                  Your account will be fully active and ready to use when the site goes live.
                </p>
                <p className="mt-3 text-sm font-medium text-primary">
                  Stay tuned—we can't wait to show you what's coming! 😊
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}