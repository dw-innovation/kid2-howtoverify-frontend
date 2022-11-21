import useAppContext from "@/lib/hooks/useAppContext";
import { trackAction } from "@/lib/lib";
import React from "react";
import ShareIcon from "src/assets/svg/share";
import PopOver from "../popOver";

const ShareButton = () => {
  const { setAppState } = useAppContext();
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
        className="text-blue hover:text-purple^"
      >
        <ShareIcon width={24} />
      </button>
      <PopOver />
    </>
  );
};
export default ShareButton;
