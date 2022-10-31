import React, { useEffect, useState } from "react";
import useAppContext from "@/lib/hooks/useAppContext";
import NodeInfoItem from "./nodeInfoItem";

const NodeInfo = () => {
  const {
    appState: {
      graph: {
        data: { nodes },
        pathNodes,
      },
    },
  } = useAppContext();

  const [lastNode, setLastNode] = useState(undefined);

  useEffect(() => {
    nodes.filter(({ id }) => pathNodes.at(-1) === id)[0] &&
      setLastNode(nodes.filter(({ id }) => pathNodes.at(-1) === id)[0]);
  }, [nodes]);

  return (
    <div className="bg-teal-100 p-2 w-[20vw]">
      <h3 className="font-bold text-xl">Info on current node</h3>
      {lastNode !== undefined && (
        <>
          <NodeInfoItem name="ID" body={lastNode.id} />
          <NodeInfoItem name="Name" body={lastNode.name} />
          <NodeInfoItem name="Comment" body={lastNode.comment} />
        </>
      )}
    </div>
  );
};

export default NodeInfo;
