import useAppContext from "@/lib/hooks/useAppContext";
import React from "react";
import { removePrefix } from "@/lib/lib";

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
    const newPathNodes = pathNodes.slice(0, position + 1);

    setAppState((prev) => ({
      ...prev,
      graph: {
        ...prev.graph,
        pathNodes: newPathNodes,
      },
    }));

    const urlPath = `/${newPathNodes
      .map((node) => removePrefix(node))
      .join("/")}`;

    console.log(urlPath);
    // push new URL path to browser history
    typeof window !== "undefined" &&
      window.history.pushState({}, urlPath, urlPath);
  };

  return (
    <button onClick={() => handleClick()} className="hover:text-blue">
      {nodes.filter(({ id }) => id === nodeId)[0]?.name}
    </button>
  );
};

export default TrailItem;
