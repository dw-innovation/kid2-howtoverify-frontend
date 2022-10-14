import useTranslation from "next-translate/useTranslation";
import React from "react";
import Button from "../button";

const ShareButton = () => {
  const { t } = useTranslation("common");
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
      }}
      className="font-bold"
    >
      {t("copyPermalink")}
    </Button>
  );
};
export default ShareButton;
