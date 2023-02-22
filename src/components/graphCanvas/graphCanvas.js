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
      <div className="relative z-10 flex items-center justify-center flex-1 pl-2">
        {pathNodes.length !== 0 ? <GraphRenderer /> : <MediaTypeSelector />}
      </div>
      <div className="relative w-full p-2 pl-2 lg:pl-8 bg-lightGrey">
        <Navigation />
      </div>
    </div>
  );
};

export default GraphCanvas;
