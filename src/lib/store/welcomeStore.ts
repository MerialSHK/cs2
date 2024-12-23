import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WelcomeState {
  showWelcome: boolean;
  setShowWelcome: (show: boolean) => void;
  registrationComplete: boolean;
  setRegistrationComplete: (complete: boolean) => void;
}

export const useWelcomeStore = create<WelcomeState>()(
  persist(
    (set) => ({
      showWelcome: false,
      setShowWelcome: (show) => set({ showWelcome: show }),
      registrationComplete: false,
      setRegistrationComplete: (complete) => set({ registrationComplete: complete }),
    }),
    {
      name: 'welcome-storage',
    }
  )
);