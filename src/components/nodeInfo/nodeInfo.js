import React, { Fragment, useEffect, useState } from "react";
import useAppContext from "@/lib/hooks/useAppContext";
import NodeInfoItem from "./nodeInfoItem";
import { SAFELIST } from "@/lib/const";

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
      {lastNode !== undefined &&
        Object.keys(lastNode).map((property, index) => (
          <Fragment key={index}>
            {SAFELIST.includes(property) ? (
              <NodeInfoItem name={property} body={lastNode[property]} />
            ) : (
              <></>
            )}
          </Fragment>
        ))}
    </div>
  );
};

export default NodeInfo;
