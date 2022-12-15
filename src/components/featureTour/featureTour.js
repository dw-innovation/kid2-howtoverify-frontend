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
  const addPathNode = useSessionStore((state) => state.addPathNode);
  const clearPathNodes = useSessionStore((state) => state.clearPathNodes);

  const STEPS = [
    {
      element: "#featureTour-1",
      intro: "This is our site name.",
      position: "right",
    },
    {
      element: "#featureTour-2",
      intro: "And those are buttons that you can click on",
    },
    {
      element: "#Video",
      intro: "Now let's click on Video.",
    },
    {
      element: "#What",
      intro: "You can click on yet another button.",
      position: "bottom",
    },
    {
      element: "#featureTour-5",
      intro: "Here you can get some info on the node that you've clicked on.",
    },
    {
      element: "#featureTour-6",
      intro: "Here you can type and search. It's like google.",
    },
  ];

  const stepPromise = (nextStep) =>
    new Promise((resolve) => {
      if (nextStep === 1) {
        clearPathNodes();
      }

      if (nextStep === 3) {
        clearPathNodes();
        addPathNode("http://dw.com/Video", 1);
      }

      setTimeout(() => {
        ref.current.updateStepElement(nextStep);
        resolve();
      }, 100);
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
