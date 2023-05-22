import React from "react";
import useSessionStore from "@/lib/stores/useSessionStore";
import clsx from "clsx";
import { getNodeColor } from "@/lib/lib";
import { ROOTNODES } from "@/lib/const";

const PathStackNode = ({ node, level }) => {
  const pathNodes = useSessionStore((state) => state.pathNodes);

  let addPathNode = useSessionStore((state) => state.addPathNode);
  const truncatePathNodes = useSessionStore((state) => state.truncatePathNodes);
  let toggleShowResults = useSessionStore((state) => state.toggleShowResults);
  let clearSearchQueryString = useSessionStore(
    (state) => state.clearSearchQueryString
  );

  const handleClick = () => {
    truncatePathNodes(level - 1);

    if (node.id === pathNodes[pathNodes.length - 1]) return null;

    addPathNode(node.id, level);
    toggleShowResults(false);
    clearSearchQueryString();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        (pathNodes.includes(node.id) ||
          ROOTNODES.filter(({ id }) => node.id === id).length === 1) &&
          "text-white",
        "p-2 rounded-md my-2 leading-tight text-lg"
      )}
      style={{
        backgroundColor:
          ROOTNODES.filter(({ id }) => node.id === id).length === 1
            ? getNodeColor(node.id, "primary")
            : pathNodes.includes(node.id)
            ? getNodeColor(pathNodes[0], "primary")
            : "#ccc",
      }}
    >
      {node.name}
    </button>
  );
};

export default PathStackNode;
