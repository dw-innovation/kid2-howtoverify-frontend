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
  const pathNodes = useSessionStore((state) => state.pathNodes);

  const STEPS = [
    {
      element: "#featureTour-1",
      title: "Welcome!",
      intro:
        "This site offers an overview of workflows and tools for verification of digital media",
    },
    {
      element: "#featureTour-2",
      title: "Select media type",
      intro:
        "What media type do you want to verify? Choose from these five to open up the respective verification workflow.",
    },
    {
      element: "#featureTour-3",
      title: "Verification Workflows",
      intro:
        "Click on a bubble to open a workflow and drill down to the tool level. Workflows are set up to answer the main journalistic verification questions. Tip: you can drag bubbles with your mouse.",
    },
    {
      element: "#InVid",
      title: "Verification Tools",
      intro:
        "At the end of each workflow, you find a selection of tools. Click on them for a detailed description and tips on how to use the tool.",
      position: "bottom",
    },
    {
      element: "#featureTour-5",
      title: "Detailed Descriptions",
      intro:
        "Each step of the workflows and each tool are described in detail. Including tips and tricks on how to best use them.",
      position: "left",
    },
    {
      element: "#featureTour-6",
      title: "Search",
      intro:
        "Are you looking for a specific method or tool? Search for it here.",
      position: "left",
    },
    {
      element: "#featureTour-7",
      title: "Give us Feedback!",
      intro:
        "Found a bug, is something missing or do you want to leave a general remark? Provide us with your feedback here. Much appreciated!",
      position: "left",
    },
  ];

  const stepPromise = (nextStep) =>
    new Promise((resolve) => {
      if ([0, 1].includes(nextStep)) {
        clearPathNodes();
      }

      if (nextStep >= 2 && pathNodes.length === 0) {
        replacePathNodes([
          "http://dw.com/Image",
          "http://dw.com/Who",
          "http://dw.com/Who_created_content",
          "http://dw.com/Metadata",
          "http://dw.com/InVid",
        ]);
      }

      if ([1, 2, 3].includes(nextStep)) {
        setTimeout(() => {
          ref.current.updateStepElement(nextStep);
          resolve();
        }, 500);
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
          options={{
            doneLabel: "Finish",
            hideNext: false,
          }}
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
