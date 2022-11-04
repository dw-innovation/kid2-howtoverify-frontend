import React from "react";
import ShareIcon from "src/assets/svg/share";

const ShareButton = () => {
  return (
    <button
      onClick={() => {
        typeof navigator !== "undefined" &&
          navigator.clipboard.writeText(window.location.href);
      }}
      className="text-blue hover:text-purple"
    >
      <ShareIcon />
    </button>
  );
};
export default ShareButton;
