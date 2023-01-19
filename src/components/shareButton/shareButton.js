import { trackAction } from "@/lib/lib";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import ShareIcon from "src/assets/svg/share";

const ShareButton = () => {
  const { t } = useTranslation("common");

  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild();
    const timer = setTimeout(() => setButtonClicked(false), 2000);
    return () => clearTimeout(timer);
  }, [buttonClicked]);

  return (
    <>
      <button
        key={
          buttonClicked ? "urlCopied" : "shareTooltip"
        }
        onClick={() => {
          if (typeof navigator !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            trackAction("urlCopied");
            setButtonClicked(true);
          }
        }}
        className="text-primary"
        data-tip={buttonClicked ? t("urlCopied") : t("shareTooltip")}
      >
        <ShareIcon width={24} />
      </button>
      <ReactTooltip />
    </>
  );
};
export default ShareButton;
