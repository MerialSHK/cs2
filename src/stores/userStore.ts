import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  country?: string;
  isAdmin: boolean;
  coins: Array<{
    id: string;
    name: string;
    amount: number;
    value: number;
  }>;
}

interface UserStore {
  user: User | null;
  isAdmin: boolean;
  setUser: (user: User) => void;
  updateUserProfile: (data: Partial<User>) => void;
  logout: () => void;
}

// Initialize with mock data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  isAdmin: true,
  coins: [
    { id: '1', name: 'Bitcoin', amount: 2.5, value: 115000 },
    { id: '2', name: 'Ethereum', amount: 15, value: 45000 },
    { id: '3', name: 'Solana', amount: 150, value: 15000 },
  ],
};

export const useUserStore = create<UserStore>((set) => ({
  user: mockUser,
  isAdmin: mockUser.isAdmin,
  setUser: (user) => set({ user, isAdmin: user.isAdmin }),
  updateUserProfile: (data) => 
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null
    })),
  logout: () => set({ user: null, isAdmin: false }),
}));