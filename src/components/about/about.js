import useTranslation from "next-translate/useTranslation";
import React from "react";
import ReactMarkdown from "react-markdown";
import Accordion from "../accordion";

const About = () => {
  const { t } = useTranslation("common");

  return (
    <Accordion title="About">
      <ReactMarkdown children={t("aboutText")} />
    </Accordion>
  );
};

export default About;
