import useAppContext from "@/lib/hooks/useAppContext";
import useTranslation from "next-translate/useTranslation";
import React, { Fragment, useState } from "react";
import FooterLink from "../footerLink";

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

  const LINKS = ["about", "legal", "privacy"];

  return (
    <div className="font-noto text-sm md:text-md flex gap-3 justify-center py-1 border-t-2">
      <span dangerouslySetInnerHTML={{ __html: t("copyright") }} />
      {LINKS.map((link, index) => (
        <Fragment key={index}>
          <FooterLink
            innerHTML={t(`${link}Link`)}
            onClickAction={(e) => handleClick(e, link)}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default Footer;
