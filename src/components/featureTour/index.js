import dynamic from "next/dynamic";

const DynamicFeatureTour = dynamic(() => import("./featureTour"), {
  ssr: false,
});

export default DynamicFeatureTour;
