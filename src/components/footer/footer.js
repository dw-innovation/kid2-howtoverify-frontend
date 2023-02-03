import usePersistedStore from "@/lib/stores/usePersistedStore";
import useSessionStore from "@/lib/stores/useSessionStore";
import useTranslation from "next-translate/useTranslation";
import React, { Fragment } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import FooterLink from "../footerLink";

const Footer = () => {
  const { t } = useTranslation("footer");

  const toggleModal = useSessionStore((state) => state.toggleModal);
  const setModalContent = useSessionStore((state) => state.setModalContent);

  const handleClick = (e, target) => {
    e.preventDefault();
    toggleModal();
    setModalContent(target);
  };

  const LINKS = ["about", "legal-privacy"];

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer font-noto text-sm md:text-md flex gap-5 justify-center py-2 bg-grey-darker">
      <ReactMarkdown
        children={t("copyright").replace("{{YEAR}}", currentYear)}
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
    </div>
  );
};

export default Footer;
