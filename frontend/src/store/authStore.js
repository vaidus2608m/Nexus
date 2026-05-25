import { create } from 'zustand';
import API from '../api/axios';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  // Set user manually (e.g., after login or registration)
  setUser: (user) => set({ user, isAuthenticated: !!user, loading: false }),

  // Fetch the logged-in user profile on application boot
  checkAuth: async () => {
    try {
      set({ loading: true });
      const response = await API.get('/users/current-user'); // Adjust to your check-auth route
      if (response.data?.success) {
        set({ user: response.data.data, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },

  // Clear session on logout
  logout: async () => {
    try {
      await API.post('/users/logout'); // Adjust to your logout route
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  }
}));