// EcoMargin PWA — usePWAInstall Hook (TypeScript Edition)
// src/hooks/usePWAInstall.ts

import { useState, useEffect } from 'react';

const DISMISS_KEY = 'ecomargin_pwa_install_dismissed';
const DAYS_7_MS = 7 * 24 * 60 * 60 * 1000;

export default function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);

    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    const safari = /safari/.test(ua) && !/crios|fxios|opr|mercury/.test(ua);
    setIsIOS(ios);
    setIsSafari(safari);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      
      const lastDismissed = localStorage.getItem(DISMISS_KEY);
      const isDismissedRecently = lastDismissed && (Date.now() - parseInt(lastDismissed, 10) < DAYS_7_MS);

      if (!isStandalone && !isDismissedRecently) {
        setDeferredPrompt(e);
        setIsInstallable(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      localStorage.setItem('ecomargin_pwa_installed_success', 'true');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setDeferredPrompt(null);
      localStorage.setItem('ecomargin_pwa_installed_success', 'true');
      return true;
    }
    return false;
  };

  const dismissPrompt = () => {
    setIsInstallable(false);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  };

  return {
    isInstallable,
    isInstalled,
    isIOS,
    isSafari,
    installApp,
    dismissPrompt
  };
}

export { usePWAInstall };
