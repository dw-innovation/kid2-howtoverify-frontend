import React from "react";
import Button from "../button";

const ShareButton = () => (
  <Button
    onClick={() => {
      navigator.clipboard.writeText(window.location.href);
    }}
    className="font-bold"
  >
    copy link to share
  </Button>
);
export default ShareButton;
