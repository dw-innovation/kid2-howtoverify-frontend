import dynamic from "next/dynamic";

const DynamicPrivacySettingsManager = dynamic(
  import("./privacySettingsManager"),
  {
    ssr: false,
  }
);

export default DynamicPrivacySettingsManager;
