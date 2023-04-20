import React, { Fragment, useEffect, useState } from "react";
import useAppContext from "@/lib/hooks/useAppContext";

import { groupByLevel } from "@/lib/lib";
import PathStackRow from "./pathStackRow";
import { ROOTNODES } from "@/lib/const";

const PathStack = () => {
  const [groupedNodes, setGroupedNodes] = useState([]);
  const {
    appState: {
      graph: { data },
    },
  } = useAppContext();

  useEffect(() => {
    setGroupedNodes(groupByLevel(data.nodes));
  }, [data]);

  return (
    <div className="w-full">
      {Object.keys(groupedNodes).length === 0 && (
        <PathStackRow nodes={ROOTNODES} level={0} />
      )}
      {Object.keys(groupedNodes).map((level, index) => (
        <Fragment key={index}>
          <PathStackRow
            nodes={level === "0" ? ROOTNODES : groupedNodes[level]}
            level={level}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default PathStack;
