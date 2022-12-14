import usePersistedStore from "@/lib/stores/usePersistedStore";
import useSessionStore from "@/lib/stores/useSessionStore";
import useTranslation from "next-translate/useTranslation";
import React, { Fragment } from "react";
import FooterLink from "../footerLink";

const Footer = () => {
  const { t } = useTranslation("footer");

  const toggleModal = useSessionStore((state) => state.toggleModal);
  const setModalContent = useSessionStore((state) => state.setModalContent);
  const toggleFeatureTour = usePersistedStore((state) => state.toggleFeatureTour);

  const handleClick = (e, target) => {
    e.preventDefault();
    toggleModal();
    setModalContent(target);
  };

  const LINKS = ["about", "legal", "privacy"];

  return (
    <div className="font-noto text-sm md:text-md flex gap-3 justify-center py-2 bg-grey-darker">
      <span
        dangerouslySetInnerHTML={{ __html: t("copyright") }}
        className="text-grey-light"
      />
      {LINKS.map((link, index) => (
        <Fragment key={index}>
          <FooterLink
            innerHTML={t(`${link}Link`)}
            onClickAction={(e) => handleClick(e, link)}
          />
        </Fragment>
      ))}
      <FooterLink
        innerHTML="show feature tour"
        onClickAction={() => toggleFeatureTour(true)}
      />
    </div>
  );
};

export default Footer;
