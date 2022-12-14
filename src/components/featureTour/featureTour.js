import usePersistedStore from "@/lib/stores/usePersistedStore";
import React from "react";
import "intro.js/introjs.css";
import { Steps } from "intro.js-react";
import useSessionStore from "@/lib/stores/useSessionStore";

const FeatureTour = () => {
  const showFeatureTour = usePersistedStore((state) => state.showFeatureTour);
  const toggleFeatureTour = usePersistedStore(
    (state) => state.toggleFeatureTour
  );
  const addPathNode = useSessionStore((state) => state.addPathNode);
  const clearPathNodes = useSessionStore((state) => state.clearPathNodes);

  const steps = [
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
      element: "#What",
      intro: "You can click on yet another button.",
    },
    {
      element: "#featureTour-3",
      intro: "Here you can type and search. It's like google.",
    },
  ];

  return (
    <>
      {showFeatureTour && (
        <Steps
          enabled={showFeatureTour}
          steps={steps}
          initialStep={0}
          onBeforeChange={(nextStepIndex) => {
            if (nextStepIndex === 2) {
              clearPathNodes();
              addPathNode("http://dw.com/Video", 1);
            }
          }}
          onExit={() => toggleFeatureTour(false)}
        />
      )}
    </>
  );
};

export default FeatureTour;
