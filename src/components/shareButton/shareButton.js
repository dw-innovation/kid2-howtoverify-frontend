import useAppContext from "@/lib/hooks/useAppContext";
import { trackAction } from "@/lib/lib";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import ReactTooltip from "react-tooltip";
import ShareIcon from "src/assets/svg/share";
import PopOver from "../popOver";

const ShareButton = () => {
  const { setAppState } = useAppContext();
  const { t } = useTranslation("common");
  return (
    <>
      <button
        onClick={() => {
          if (typeof navigator !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            trackAction("urlCopied");
            setAppState((prev) => ({ ...prev, showPopOver: true }));
          }
        }}
        className="text-blue hover:text-purple"
        data-tip={t("shareTooltip")}
      >
        <ShareIcon width={24} />
      </button>
      <PopOver />
      <ReactTooltip />
    </>
  );
};
export default ShareButton;
