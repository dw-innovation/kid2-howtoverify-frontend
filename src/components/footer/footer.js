import useAppContext from "@/lib/hooks/useAppContext";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

const Footer = () => {
  const { t } = useTranslation("footer");
  const { setAppState } = useAppContext();

  const handleClick = (e, target) => {
    e.preventDefault();
    console.log("hallo")
    setAppState((prev) => ({
      ...prev,
      modal: { isOpen: true, content: target },
    }));
  };
  return (
    <div className="font-noto text-xs flex gap-3">
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
    </div>
  );
};

export default Footer;
