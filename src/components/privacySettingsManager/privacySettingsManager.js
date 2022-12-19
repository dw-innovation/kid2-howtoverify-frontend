import usePersistedStore from "@/lib/stores/usePersistedStore";
import React from "react";
import SettingsSwitch from "./settingsSwitch";
import useTranslation from "next-translate/useTranslation";
import ReactMarkdown from "react-markdown/lib/react-markdown";

const SettingsManager = () => {
  const trackingEnabled = usePersistedStore((state) => state.trackingEnabled);
  const toggleTracking = usePersistedStore((state) => state.toggleTracking);
  const { t } = useTranslation("common");

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: t("privacyManagerTitle") }} />
      <div className="pb-5 pl-5">
        <ReactMarkdown children={t("privacyManagerText")} />
        <SettingsSwitch
          currentState={trackingEnabled}
          label="analytics"
          toggleState={() => toggleTracking()}
        />
      </div>
    </div>
  );
};

export default SettingsManager;
