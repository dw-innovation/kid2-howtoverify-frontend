import React from "react";
import Trail from "../trail";
import FeedbackButton from "../feedbackButton";
import useAppContext from "@/lib/hooks/useAppContext";

const Navigation = () => {
  const {
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();
  return (
    <div className="absolute bottom-0 left-0 z-10 w-full p-2 flex items-center">
      <div className="flex-1 flex flex-row gap-2 relative items-start">
        {pathNodes.length > 0 && (
          <>
            <span className="font-bold">Trail: </span>
            <Trail />
          </>
        )}
      </div>
      <FeedbackButton />
    </div>
  );
};

export default Navigation;
