import useTranslation from "next-translate/useTranslation";
import React from "react";
import Button from "@/components/button";

const ShareButton = () => {
  const { t } = useTranslation("common");
  return (
    <Button
      onClick={() => {
        typeof navigator !== "undefined" && navigator.clipboard.writeText(window.location.href);
      }}
      className="font-bold"
    >
      {t("copyPermalink")}
    </Button>
  );
};
export default ShareButton;
