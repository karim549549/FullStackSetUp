import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoredUser } from "@/lib/types/user.type";

interface AuthStore {
  user: StoredUser | null;
  login: (user: StoredUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      skipHydration: true, // we'll handle hydration manually
    }
  )
);
