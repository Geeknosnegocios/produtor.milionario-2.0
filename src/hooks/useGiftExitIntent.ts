import { useEffect, useState, useRef } from "react";

interface UseGiftExitIntentOptions {
  /** Tempo mínimo na página (ms) antes do trigger poder disparar. Default 4000. */
  delayMs?: number;
  /** Se o usuário já fechou o popup nesta sessão, não dispara de novo. */
  storageKey?: string;
  /** Sensibilidade do trigger em pixels (mouse saindo pelo topo). Default 0. */
  threshold?: number;
}

/**
 * Detecta exit-intent (mouse saindo pelo topo da viewport).
 * Retorna [open, setOpen].
 */
export function useGiftExitIntent({
  delayMs = 4000,
  storageKey = "gift-exit-modal-dismissed",
  threshold = 0,
}: UseGiftExitIntentOptions = {}) {
  const [open, setOpen] = useState(false);
  const firedRef = useRef(false);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Se já foi dispensado nesta sessão, não dispara
    try {
      if (sessionStorage.getItem(storageKey) === "1") return;
    } catch { /* noop */ }

    startRef.current = Date.now();

    const handleMouseOut = (e: MouseEvent) => {
      if (firedRef.current) return;
      if (open) return;
      // Só conta se o mouse sair realmente pela janela (relatedTarget === null ou outside)
      const to = e.relatedTarget as Node | null;
      if (to !== null) return;
      // Y negativo (mouse saindo pelo topo)
      if (e.clientY > threshold) return;
      // Tempo mínimo na página
      if (Date.now() - startRef.current < delayMs) return;

      firedRef.current = true;
      setOpen(true);
    };

    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [delayMs, storageKey, threshold, open]);

  // Marca como dispensado quando fecha (qualquer caminho)
  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      try { sessionStorage.setItem(storageKey, "1"); } catch { /* noop */ }
    }
  };

  return [open, handleOpenChange] as const;
}