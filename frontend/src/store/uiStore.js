// EcoMargin — Zustand UI Store
// src/store/uiStore.js

import { create } from 'zustand'

export const useUIStore = create((set) => ({
  // ── Sidebar ──────────────────────────────────────────────────
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  closeSidebar:  () => set({ sidebarOpen: false }),

  // ── Modal ────────────────────────────────────────────────────
  modalOpen:    false,
  modalContent: null,
  openModal:  (content) => set({ modalOpen: true, modalContent: content }),
  closeModal: ()        => set({ modalOpen: false, modalContent: null }),

  // ── Theme ────────────────────────────────────────────────────
  theme: 'dark',
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

  // ── Page Loading ─────────────────────────────────────────────
  pageLoading: false,
  setPageLoading: (v) => set({ pageLoading: v }),
}))
