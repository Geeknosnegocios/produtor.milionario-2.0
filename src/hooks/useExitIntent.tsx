import { useEffect } from 'react';

interface UseExitIntentOptions {
  cooldownMinutes?: number;
  storageKey?: string;
  enableScrollTrigger?: boolean;
  enableIdleTrigger?: boolean;
}

export const useExitIntent = (
  onExitIntent: () => void,
  options: UseExitIntentOptions = {}
) => {
  const {
    cooldownMinutes = 60,
    storageKey = 'exit-intent-timestamp',
    enableScrollTrigger = true,
    enableIdleTrigger = true,
  } = options;

  useEffect(() => {
    let hasTriggered = false;
    let isReady = false;
    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    // Delay activation to avoid false triggers on page load
    const readyTimeout = setTimeout(() => {
      isReady = true;
    }, 2000);

    const fire = () => {
      if (!isReady || hasTriggered) return;

      // ?test=1 bypass for QA/testing
      const testMode = new URLSearchParams(window.location.search).has('test');

      if (!testMode) {
        // Check if user already accepted the offer
        const hasAccepted = localStorage.getItem('produtor-milionario-exit-accepted');
        if (hasAccepted) return;

        // Check cooldown
        const lastShown = localStorage.getItem(storageKey);
        if (lastShown) {
          const timePassed = Date.now() - parseInt(lastShown);
          const cooldownMs = cooldownMinutes * 60 * 1000;
          if (timePassed < cooldownMs) return;
        }
      }

      hasTriggered = true;
      if (!testMode) localStorage.setItem(storageKey, Date.now().toString());
      onExitIntent();
    };

    // 1. Desktop · mouse leaves viewport at top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        fire();
      }
    };

    // 2. Mobile/Desktop · scroll-up after scrolling down significantly
    const handleScroll = () => {
      if (!isReady || hasTriggered || !enableScrollTrigger) return;

      const currentY = window.scrollY;
      const goingUp = currentY < lastScrollY;
      const scrolledFar = lastScrollY > 800;

      if (goingUp && scrolledFar && (lastScrollY - currentY) > 100) {
        scrollUpCount++;
        if (scrollUpCount >= 2) fire();
      }

      lastScrollY = currentY;
    };

    // 3. Idle trigger · 45s without interaction after scrolling
    const resetIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (!enableIdleTrigger || !isReady || hasTriggered) return;

      idleTimer = setTimeout(() => {
        if (window.scrollY > 400) fire();
      }, 45000);
    };

    // 4. Mobile · back button via popstate
    const handlePopState = () => {
      fire();
    };

    // 5. Mobile · history push trick to capture back button
    if (typeof window !== 'undefined') {
      window.history.pushState({ exitIntent: true }, '', window.location.href);
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('mousemove', resetIdle);
    document.addEventListener('touchstart', resetIdle, { passive: true });
    document.addEventListener('keydown', resetIdle);
    resetIdle();

    return () => {
      clearTimeout(readyTimeout);
      if (idleTimer) clearTimeout(idleTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('mousemove', resetIdle);
      document.removeEventListener('touchstart', resetIdle);
      document.removeEventListener('keydown', resetIdle);
    };
  }, [onExitIntent, cooldownMinutes, storageKey, enableScrollTrigger, enableIdleTrigger]);
};
