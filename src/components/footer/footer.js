import useSessionStore from "@/lib/stores/useSessionStore";
import useTranslation from "next-translate/useTranslation";
import React, { Fragment, useRef, useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import FooterLink from "../footerLink";
import useWindowSize from "@/lib/hooks/useWindowSize";

const Footer = () => {
  const { t } = useTranslation("footer");
  const { width, height } = useWindowSize();

  const ref = useRef(null);

  const toggleModal = useSessionStore((state) => state.toggleModal);
  const setModalContent = useSessionStore((state) => state.setModalContent);
  const setFooterHeight = useSessionStore((state) => state.setFooterHeight);

  useEffect(() => {
    if (!ref?.current) return;
    const footerHeight = ref?.current?.clientHeight;
    setFooterHeight(footerHeight);
  }, [width, height]);

  const handleClick = (e, target) => {
    e.preventDefault();
    toggleModal();
    setModalContent(target);
  };

  const LINKS = ["about", "legal-privacy"];

  const currentYear = new Date().getFullYear();

  return (
    <div
      className="flex justify-center gap-5 px-2 py-2 text-sm footer font-noto md:text-md bg-grey-darker"
      ref={ref}
    >
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
