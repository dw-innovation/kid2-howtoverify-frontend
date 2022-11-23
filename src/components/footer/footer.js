import useAppContext from "@/lib/hooks/useAppContext";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

const Footer = () => {
  const { t } = useTranslation("footer");
  const { setAppState } = useAppContext();

  const handleClick = (e, target) => {
    e.preventDefault();
    setAppState((prev) => ({
      ...prev,
      modal: { isOpen: true, content: target },
    }));
  };
  return (
    <div className="font-noto text-xs flex gap-3 justify-center py-1 border-t-2">
      <span dangerouslySetInnerHTML={{ __html: t("copyright") }} />
      <a
        dangerouslySetInnerHTML={{ __html: t("legalLink") }}
        className="text-blue hover:brighter cursor-pointer"
        onClick={(e) => handleClick(e, "legal")}
      />
      <a
        dangerouslySetInnerHTML={{ __html: t("privacyLink") }}
        className="text-blue hover:brighter cursor-pointer"
        onClick={(e) => handleClick(e, "privacy")}
      />
      <a
        dangerouslySetInnerHTML={{ __html: t("sendFeedback") }}
        className="text-blue hover:brighter cursor-pointer"
        href={process.env.NEXT_PUBLIC_FEEDBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
  );
};

export default Footer;
