import { create } from 'zustand';
import { AUTH_KEYS } from '../constants';  // Import the constants file

// Define the type for the Auth Store
interface AuthStore {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the Zustand store
export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem(AUTH_KEYS.authToken),
  login: (token: string) => {
    localStorage.setItem(AUTH_KEYS.authToken, token); // Persist token
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem(AUTH_KEYS.authToken); // Clear token
    set({ isAuthenticated: false });
  },
}));
