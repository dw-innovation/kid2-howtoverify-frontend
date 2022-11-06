import React, { Fragment, useEffect, useRef, useState } from "react";
import useAppContext from "@/lib/hooks/useAppContext";
import NodeInfoItem from "./nodeInfoItem";
import { SAFELIST } from "@/lib/const";
import Accordion from "../accordion";

const NodeInfo = () => {
  const {
    appState: {
      graph: {
        data: { nodes },
        pathNodes,
      },
    },
  } = useAppContext();

  const ref = useRef();

  const [lastNode, setLastNode] = useState(undefined);

  useEffect(() => {
    nodes.filter(({ id }) => pathNodes.at(-1) === id)[0] &&
      setLastNode(nodes.filter(({ id }) => pathNodes.at(-1) === id)[0]);
  }, [nodes]);

  return (
    <Accordion title="info on current node">
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
    </Accordion>
  );
};

export default NodeInfo;
