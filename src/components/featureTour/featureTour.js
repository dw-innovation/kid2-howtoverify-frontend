import { Steps } from "intro.js-react";
import React, { useState } from "react";
import "intro.js/introjs.css";

const FeatureTour = () => {
  const [enabled, setEnabled] = useState(true);

  const steps = [
    {
      element: "#featureTour--1",
      intro: "Select the type of media element that you want to verify",
      position: "top",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element: "#featureTour--2",
      intro: "Search for tools and verification workflows",
      position: "right",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
    {
      element: "#featureTour--3",
      intro: "Get information on the selected node",
      position: "right",
      tooltipClass: "myTooltipClass",
      highlightClass: "myHighlightClass",
    },
  ];

  return (
    <Steps
      steps={steps}
      initialStep={0}
      enabled={enabled}
      onExit={() => setEnabled(false)}
    />
  );
};

export default FeatureTour;
