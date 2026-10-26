import { useEffect } from "react";

const BlackFridayPrivacy = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Privacidade — Black Friday FPM 2.0";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <iframe
      title="Privacidade e dados da campanha Black Friday FPM 2.0"
      src="/bf-capture/privacidade/index.html"
      className="fixed inset-0 h-dvh w-screen border-0 bg-[#020617]"
    />
  );
};

export default BlackFridayPrivacy;
