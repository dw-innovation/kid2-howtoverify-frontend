import useTranslation from "next-translate/useTranslation";
import React from "react";
import Div100vh from "react-div-100vh";

const MobileScreen = () => {
  const { t } = useTranslation("common");
  return (
    <Div100vh className="md:hidden w-screen flex items-center justify-center flex-col p-3 z-[9999] bg-white absolute">
      <h1 className="font-bold font-georgia text-blue-primary text-2xl mb-2">
        {t("mobileTitle")}
      </h1>
      <span className="text-center">{t("mobileDescription")}</span>
      <span className="text-center">{t("mobileAlert")}</span>
    </Div100vh>
  );
};

export default MobileScreen;
