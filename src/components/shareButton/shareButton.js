import useAppContext from "@/lib/hooks/useAppContext";
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
            setAppState((prev) => ({ ...prev, showPopOver: true }));
          }
        }}
        className="text-blue hover:text-purple^"
      >
        <ShareIcon />
      </button>
      <PopOver />
    </>
  );
};
export default ShareButton;
