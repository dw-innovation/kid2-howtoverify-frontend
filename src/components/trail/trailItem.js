import useAppContext from "@/lib/hooks/useAppContext";
import React from "react";
import { generateURL, removePrefix, trackAction } from "@/lib/lib";
import clsx from "clsx";

const TrailItem = ({ id: nodeId, position }) => {
  const {
    appState: {
      graph: {
        data: { nodes },
        pathNodes,
      },
    },
    setAppState,
  } = useAppContext();

  const handleClick = () => {
    if (position === pathNodes.length - 1) {
      return null;
    }

    const newPathNodes = pathNodes.slice(0, position + 1);

    setAppState((prev) => ({
      ...prev,
      graph: {
        ...prev.graph,
        pathNodes: newPathNodes,
      },
    }));

    trackAction("trailClick", generateURL(newPathNodes));
  };

  return (
    <button
      onClick={() => handleClick()}
      className={clsx(
        position === pathNodes.length - 1
          ? "font-bold"
          : "text-[#737373] hover:text-blue"
      )}
    >
      {nodes.filter(({ id }) => id === nodeId)[0]?.name}
    </button>
  );
};

export default TrailItem;
