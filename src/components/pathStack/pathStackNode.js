import React from "react";
import useSessionStore from "@/lib/stores/useSessionStore";
import clsx from "clsx";

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
        pathNodes.includes(node.id) && "bg-blue-primary text-white",
        " p-2 rounded-md my-2"
      )}
    >
      {node.name}
    </button>
  );
};

export default PathStackNode;
