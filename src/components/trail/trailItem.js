import useAppContext from "@/lib/hooks/useAppContext";
import React from "react";
import { generateURL, trackAction } from "@/lib/lib";
import clsx from "clsx";
import useSessionStore from "@/lib/stores/useSessionStore";

const TrailItem = ({ id: nodeId, position }) => {
  const {
    appState: {
      graph: {
        data: { nodes },
      },
    },
  } = useAppContext();
  const pathNodes = useSessionStore((state) => state.pathNodes);
  const truncatePathNodes = useSessionStore((state) => state.truncatePathNodes);

  const handleClick = () => {
    if (position === pathNodes.length - 1) {
      return null;
    }

    const newPathNodes = pathNodes.slice(0, position + 1);
    truncatePathNodes(position);
    trackAction("trailClick", generateURL(newPathNodes));
  };

  return (
    <button
      onClick={() => handleClick()}
      className={clsx(
        position === pathNodes.length - 1
          ? "font-bold cursor-default"
          : "text-[#737373] hover:text-blue",
        "font-noto text-center leading-3"
      )}
    >
      {nodes.filter(({ id }) => id === nodeId)[0]?.name}
    </button>
  );
};

export default TrailItem;
