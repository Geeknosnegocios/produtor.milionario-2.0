import { useCallback, useEffect, useRef } from "react";
import { trackCustomEvent, trackLead, trackViewContent } from "@/lib/tracking";

type FpmEvent = CustomEvent<{ event?: string; [key: string]: unknown }>;

const BlackFriday = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const attachTracking = useCallback(() => {
    const childWindow = frameRef.current?.contentWindow;
    if (!childWindow) return () => undefined;

    const handleEvent = (rawEvent: Event) => {
      const eventName = (rawEvent as FpmEvent).detail?.event;
      if (eventName === "lead_saved") {
        trackLead("blackfriday-capture", 0);
      }
      if (eventName === "cta_click_group_intent" || eventName === "group_redirect_initiated") {
        trackCustomEvent(eventName, { placement: "blackfriday-thankyou" });
      }
    };

    childWindow.addEventListener("fpm:event", handleEvent);
    return () => childWindow.removeEventListener("fpm:event", handleEvent);
  }, []);

  useEffect(() => {
    trackViewContent("Produtor Milionário 2.0 — Captura Black Friday 2026");
    const frame = frameRef.current;
    if (!frame) return;

    let detach = () => undefined;
    const onLoad = () => {
      detach();
      detach = attachTracking();
    };
    frame.addEventListener("load", onLoad);
    return () => {
      frame.removeEventListener("load", onLoad);
      detach();
    };
  }, [attachTracking]);

  return (
    <iframe
      ref={frameRef}
      title="Cadastro para a aula Black Friday FPM 2.0"
      src="/bf-capture/index.html"
      className="fixed inset-0 h-dvh w-screen border-0 bg-[#020617]"
    />
  );
};

export default BlackFriday;
