import usePersistedStore from "@/lib/stores/usePersistedStore";
import React from "react";
import SettingsSwitch from "./settingsSwitch";

const SettingsManager = () => {
  const trackingEnabled = usePersistedStore((state) => state.trackingEnabled);
  const toggleTracking = usePersistedStore((state) => state.toggleTracking);

  return (
    <div>
      <h1>Manage your privacy settings</h1>
      <div className="pb-5 pl-5">
        <p>Manage your consent to anonymous analytics on our site:</p>
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
