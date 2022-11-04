import useTranslation from "next-translate/useTranslation";
import React from "react";
import ReactMarkdown from "react-markdown";

const About = () => {
  const { t } = useTranslation("common");

  return (
    <details>
      <summary className="font-bold cursor-pointer">{t("aboutTitle")}</summary>
      <span>
        <ReactMarkdown children={t("aboutText")} />
      </span>
    </details>
  );
};

export default About;
