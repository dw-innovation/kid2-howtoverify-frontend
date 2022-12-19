import usePersistedStore from "@/lib/stores/usePersistedStore";
import React, { useRef } from "react";
import "intro.js/introjs.css";
import { Steps } from "intro.js-react";
import useSessionStore from "@/lib/stores/useSessionStore";

const FeatureTour = () => {
  const ref = useRef(null);
  const showFeatureTour = usePersistedStore((state) => state.showFeatureTour);
  const toggleFeatureTour = usePersistedStore(
    (state) => state.toggleFeatureTour
  );
  const replacePathNodes = useSessionStore((state) => state.replacePathNodes);
  const clearPathNodes = useSessionStore((state) => state.clearPathNodes);

  const STEPS = [
    {
      title: "How to Verify",
      intro:
        'Welcome to "How to Verify"! This site offers an overview of workflows and tools for your verification challenge.',
    },
    {
      element: "#featureTour-2",
      title: "Media Types",
      intro:
        "What media type are you trying to verify? Choose from the five types to open up the respective overview.",
    },
    {
      element: "#Image",
      intro: "Now let's click on Video.",
    },
    {
      element: "#InVid",
      intro:
        "At the end of each workflow, you can find a selection of tools. Click on it once more for a detailed description.",
      position: "bottom",
    },
    {
      element: "#featureTour-5",
      intro:
        "All steps of the workflows as well as all tools are described in detail, including how to best use it as well as tips and tricks.",
      position: "left",
    },
    {
      element: "#featureTour-6",
      intro:
        "If you are looking for a specific step, method or tool, you can search for it here. All available options will be displayed for you to choose from.",
      position: "left",
    },
    {
      element: "#featureTour-7",
      intro:
        "If you feel like there is something missing or you found a bug or just want to leave a general remark, you may do so via the feedback option here.",
      position: "left",
    },
  ];

  const stepPromise = (nextStep) =>
    new Promise((resolve) => {
      if (nextStep === 1) {
        clearPathNodes();
      }

      if (nextStep === 3) {
        clearPathNodes();
        replacePathNodes([
          "http://dw.com/Image",
          "http://dw.com/Who",
          "http://dw.com/Who_created_content",
          "http://dw.com/Metadata",
          "http://dw.com/InVid",
        ]);
      }
      if (nextStep === 3) {
        setTimeout(() => {
          ref.current.updateStepElement(nextStep);
          resolve();
        }, 300);
      } else {
        resolve();
      }
    });

  return (
    <div className="hidden md:block">
      {showFeatureTour && (
        <Steps
          enabled={showFeatureTour}
          steps={STEPS}
          initialStep={0}
          onBeforeChange={async (nextStepIndex) =>
            await stepPromise(nextStepIndex)
          }
          onExit={() => toggleFeatureTour(false)}
          ref={ref}
        />
      )}
    </div>
  );
};

export default FeatureTour;
