// EcoMargin PWA — useAppUpdate Hook (TypeScript Edition)
// src/hooks/useAppUpdate.ts

import { useState, useEffect } from 'react';

export function useAppUpdate() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.ready.then((reg) => {
      setRegistration(reg);

      if (reg.waiting) {
        setUpdateAvailable(true);
      }

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          });
        }
      });
    });

    if (localStorage.getItem('ecomargin_pwa_updated') === 'true') {
      setUpdateSuccess(true);
      localStorage.removeItem('ecomargin_pwa_updated');
      
      const timer = setTimeout(() => {
        setUpdateSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!registration) return;

    const checkUpdate = () => {
      registration.update().catch((err) => console.warn('Update check failed:', err));
    };

    const intervalId = setInterval(checkUpdate, 5 * 60 * 1000);

    const handleFocusOrOnline = () => {
      checkUpdate();
    };

    window.addEventListener('focus', handleFocusOrOnline);
    window.addEventListener('online', handleFocusOrOnline);
    document.addEventListener('visibilitychange', handleFocusOrOnline);

    let refreshing = false;
    const handleControllerChange = () => {
      if (refreshing) return;
      refreshing = true;
      localStorage.setItem('ecomargin_pwa_updated', 'true');
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocusOrOnline);
      window.removeEventListener('online', handleFocusOrOnline);
      document.removeEventListener('visibilitychange', handleFocusOrOnline);
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, [registration]);

  const updateApp = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  return {
    updateAvailable,
    updateSuccess,
    updateApp
  };
}
