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
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    document.title = "Cadastro confirmado — Black Friday FPM 2.0";
    if (description) description.content = "Seu cadastro foi registrado. Entre no grupo oficial para receber o link da aula e o presente da Black Friday.";
    const frame = frameRef.current;
    if (!frame) return () => { document.title = previousTitle; if (description && previousDescription) description.content = previousDescription; };
    let detach = () => undefined;
    const onLoad = () => {
      detach();
      detach = attachTracking();
    };
    frame.addEventListener("load", onLoad);
    return () => {
      frame.removeEventListener("load", onLoad);
      detach();
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
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
