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
    <div className="flex">
      <div className="flex-1 flex flex-row gap-2 relative items-center">
        <Trail />
      </div>
      <FeedbackButton />
    </div>
  );
};

export default Navigation;
