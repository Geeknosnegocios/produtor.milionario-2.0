import { useEffect } from 'react';

interface UseExitIntentOptions {
  cooldownMinutes?: number;
  storageKey?: string;
}

export const useExitIntent = (
  onExitIntent: () => void,
  options: UseExitIntentOptions = {}
) => {
  const { cooldownMinutes = 60, storageKey = 'exit-intent-timestamp' } = options;

  useEffect(() => {
    let hasTriggered = false;
    let isReady = false;

    // Delay activation to avoid false triggers on page load
    const readyTimeout = setTimeout(() => {
      isReady = true;
    }, 1000);

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if ready and mouse actually left the document at the top
      if (!isReady || hasTriggered) return;
      
      // Check if mouse left at the top of the viewport (closing tab/window behavior)
      // relatedTarget is null when mouse leaves the browser window entirely
      if (e.clientY < 0 && e.relatedTarget === null) {
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

        hasTriggered = true;
        localStorage.setItem(storageKey, Date.now().toString());
        onExitIntent();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(readyTimeout);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [onExitIntent, cooldownMinutes, storageKey]);
};
