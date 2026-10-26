import { useCallback, useEffect, useRef } from "react";
import { trackCustomEvent, trackLead, trackViewContent } from "@/lib/tracking";

type FpmEvent = CustomEvent<{ event?: string; [key: string]: unknown }>;

const BlackFriday = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const captureSrc = `/bf-capture/index.html${typeof window === "undefined" ? "" : window.location.search}`;

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
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    const previous = {
      description: description?.content,
      canonical: canonical?.href,
      ogTitle: ogTitle?.content,
      ogDescription: ogDescription?.content,
      ogUrl: ogUrl?.content,
    };
    const pageTitle = "Aula gratuita Black Friday FPM 2.0 — cadastro";
    document.title = pageTitle;
    if (description) description.content = "Cadastre-se para a aula gratuita da Black Friday FPM 2.0 e receba o kit com cinco comandos e checklist.";
    if (canonical) canonical.href = "https://produtor.geekacademy.site/blackfriday";
    if (ogTitle) ogTitle.content = pageTitle;
    if (ogDescription) ogDescription.content = "Aula gratuita e ao vivo sobre como estruturar um produto low ticket com IA. Cadastre-se e receba o kit de preparação.";
    if (ogUrl) ogUrl.content = "https://produtor.geekacademy.site/blackfriday";
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
      document.title = previousTitle;
      if (description && previous.description) description.content = previous.description;
      if (canonical && previous.canonical) canonical.href = previous.canonical;
      if (ogTitle && previous.ogTitle) ogTitle.content = previous.ogTitle;
      if (ogDescription && previous.ogDescription) ogDescription.content = previous.ogDescription;
      if (ogUrl && previous.ogUrl) ogUrl.content = previous.ogUrl;
    };
  }, [attachTracking]);

  return (
    <iframe
      ref={frameRef}
      title="Cadastro para a aula Black Friday FPM 2.0"
      src={captureSrc}
      className="fixed inset-0 h-dvh w-screen border-0 bg-[#020617]"
    />
  );
};

export default BlackFriday;
