import usePersistedStore from "@/lib/stores/usePersistedStore";
import useSessionStore from "@/lib/stores/useSessionStore";
import useTranslation from "next-translate/useTranslation";
import React, { Fragment } from "react";
import FooterLink from "../footerLink";

const Footer = () => {
  const { t } = useTranslation("footer");

  const toggleModal = useSessionStore((state) => state.toggleModal);
  const setModalContent = useSessionStore((state) => state.setModalContent);
  const toggleFeatureTour = usePersistedStore(
    (state) => state.toggleFeatureTour
  );
  const toggleTracking = usePersistedStore((state) => state.toggleTracking);

  const handleClick = (e, target) => {
    e.preventDefault();
    toggleModal();
    setModalContent(target);
  };

  const LINKS = ["about", "legal-privacy"];

  const currentYear = new Date().getFullYear();

  return (
    <div className="font-noto text-sm md:text-md flex gap-5 justify-center py-2 bg-grey-darker">
      <span
        dangerouslySetInnerHTML={{
          __html: t("copyright").replace("{{YEAR}}", currentYear),
        }}
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
      <FooterLink
        innerHTML="disable tracking"
        onClickAction={() => toggleTracking(false)}
      />
    </div>
  );
};

export default Footer;
