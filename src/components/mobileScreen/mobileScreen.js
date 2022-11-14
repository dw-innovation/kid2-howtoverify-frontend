import useTranslation from "next-translate/useTranslation";
import React from "react";

const MobileScreen = () => {
  const { t } = useTranslation("common");
  return (
    <div className="md:hidden w-screen h-screen flex items-center justify-center flex-col p-3">
      <h1 className="font-bold font-georgia text-blue text-2xl mb-2">{t("mobileTitle")}</h1>
      <span className="text-center">{t("mobileDescription")}</span>
      <span className="text-center">{t("mobileAlert")}</span>
    </div>
  );
};

export default MobileScreen;
