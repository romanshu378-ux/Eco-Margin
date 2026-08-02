// EcoMargin — Zustand Auth Store
// src/store/authStore.js

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // ── State ─────────────────────────────────────────────
      user:            null,
      token:           null,
      isAuthenticated: false,
      isLoading:       false,

      // ── Actions ───────────────────────────────────────────
      setUser:  (user)  => set({ user, isAuthenticated: !!user }),
      setToken: (token) => {
        set({ token })
        if (token) localStorage.setItem('ecomargin_token', token)
        else        localStorage.removeItem('ecomargin_token')
      },
      setLoading: (isLoading) => set({ isLoading }),

      login: (user, token) => {
        set({ user, token, isAuthenticated: true, isLoading: false })
        localStorage.setItem('ecomargin_token', token)
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        localStorage.removeItem('ecomargin_token')
      },

      // ── Selectors ─────────────────────────────────────────
      getUser:    () => get().user,
      isAdmin:    () => get().user?.role === 'admin',
      isOperator: () => get().user?.role === 'operator',
    }),
    {
      name:    'ecomargin-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user:  state.user,
        token: state.token,
      }),
    },
  ),
)
