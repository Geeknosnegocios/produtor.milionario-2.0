import { useEffect, useRef } from "react";

const BlackFridayThanks = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    document.title = "Cadastro confirmado — Black Friday FPM 2.0";
    if (description) description.content = "Seu cadastro foi registrado. Entre no grupo oficial para receber o link da aula e o presente da Black Friday.";
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

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
