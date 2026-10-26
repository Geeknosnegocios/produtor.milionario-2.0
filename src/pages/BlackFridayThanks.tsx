import { useCallback, useEffect, useRef } from "react";
import { trackCustomEvent } from "@/lib/tracking";

const BlackFridayThanks = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const attachTracking = useCallback(() => {
    const childWindow = frameRef.current?.contentWindow;
    if (!childWindow) return () => undefined;
    const onGroupIntent = (event: Event) => {
      const detail = (event as CustomEvent<{ event?: string }>).detail;
      if (detail?.event === "cta_click_group_intent" || detail?.event === "group_redirect_initiated") {
        trackCustomEvent(detail.event, { placement: "blackfriday-thankyou" });
      }
    };
    childWindow.addEventListener("fpm:event", onGroupIntent);
    return () => childWindow.removeEventListener("fpm:event", onGroupIntent);
  }, []);

  useEffect(() => {
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
      title="Confirmação do cadastro da Black Friday FPM 2.0"
      src="/bf-capture/obrigado/index.html"
      className="fixed inset-0 h-dvh w-screen border-0 bg-[#020617]"
    />
  );
};

export default BlackFridayThanks;
