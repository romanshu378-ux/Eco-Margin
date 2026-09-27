// EcoMargin PWA — usePWAInstall Hook (Install UI Disabled)
// src/hooks/usePWAInstall.ts

import { useState, useEffect } from 'react';

export default function usePWAInstall() {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const isStandalone = typeof window !== 'undefined' && 
      (window.matchMedia('(display-mode: standalone)').matches || 
       (window.navigator as any).standalone === true);
    setIsInstalled(isStandalone);

    // Suppress browser default install prompt without triggering any custom UI
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async () => false;
  const dismissPrompt = () => {};

  return {
    isInstallable: false,
    isInstalled,
    isIOS: false,
    isSafari: false,
    installApp,
    dismissPrompt
  };
}

export { usePWAInstall };

