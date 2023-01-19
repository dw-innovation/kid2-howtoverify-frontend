import React from "react";
import GraphRenderer from "../graphRenderer";
import Navigation from "../navigation";
import MediaTypeSelector from "../mediaTypeSelector";
import useSessionStore from "@/lib/stores/useSessionStore";
import clsx from "clsx";

const GraphCanvas = () => {
  const pathNodes = useSessionStore((state) => state.pathNodes);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 relative z-10 items-center justify-center pl-2">
        {pathNodes.length !== 0 ? <GraphRenderer /> : <MediaTypeSelector />}
      </div>
      <div className="w-full relative pl-2 lg:pl-8 p-2 bg-lightGrey">
        <Navigation />
      </div>
    </div>
  );
};

export default GraphCanvas;
