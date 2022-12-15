import usePersistedStore from "@/lib/stores/usePersistedStore";
import useSessionStore from "@/lib/stores/useSessionStore";
import clsx from "clsx";
import Color from "color";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import tailwindConfig from "tailwind.config";

const CookieBanner = () => {
  const trackingEnabled = usePersistedStore((state) => state.trackingEnabled);
  const toggleTracking = usePersistedStore((state) => state.toggleTracking);
  const toggleModal = useSessionStore((state) => state.toggleModal);
  const setModalContent = useSessionStore((state) => state.setModalContent);
  const { t } = useTranslation("common");
  return (
    <>
      {!trackingEnabled && (
        <div
          className="fixed bottom-0 z-50 block w-screen py-6"
          style={{
            background: Color(
              tailwindConfig.theme.extend.colors.grey.dark
            ).alpha(0.9),
          }}
        >
          <div className="mx-auto flex max-w-[50rem] flex-row">
            <span
              dangerouslySetInnerHTML={{ __html: t("cookieBannerText") }}
              className="text-white"
            />
            <ul className="flex flex-row">
              <button
                onClick={() => toggleTracking(true)}
                className="button button--primary"
              >
                {t("cookieBannerButtonOK")}
              </button>
              <button
                onClick={() => {
                  setModalContent("privacy");
                  toggleModal(true);
                }}
                className="button button--secondary ml-2"
              >
                {t("cookieBannerButtonMoreInfo")}
              </button>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;
