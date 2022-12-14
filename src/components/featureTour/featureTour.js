import usePersistedStore from "@/lib/stores/usePersistedStore";
import React from "react";
import "intro.js/introjs.css";
import { Steps, Hints } from "intro.js-react";

const FeatureTour = () => {
  const showFeatureTour = usePersistedStore((state) => state.showFeatureTour);
  const toggleFeatureTour = usePersistedStore(
    (state) => state.toggleFeatureTour
  );

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
          onExit={() => toggleFeatureTour(false)}
        />
      )}
    </>
  );
};

export default FeatureTour;
