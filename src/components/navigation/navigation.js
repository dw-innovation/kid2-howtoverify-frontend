import React from "react";
import Trail from "../trail";
import ShareButton from "../shareButton";
import FeedbackButton from "../feedbackButton";
import useAppContext from "@/lib/hooks/useAppContext";

const Navigation = () => {
  const {
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();
  return (
    <div className="absolute bottom-0 left-0 z-10 w-full p-2">
      {pathNodes.length > 0 && (
        <div className="flex flex-row gap-2 relative items-center">
          <span className="font-bold">Trail: </span>
          <Trail />
          <ShareButton />
          <FeedbackButton />
        </div>
      )}
    </div>
  );
};

export default Navigation;
