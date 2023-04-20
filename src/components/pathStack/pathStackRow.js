import React, { Fragment } from "react";
import PathStackNode from "./pathStackNode";

const PathStackRow = ({ nodes, level }) => {
  return (
    <div className="flex w-full gap-2 px-2 overflow-x-scroll odd:bg-slate-100">
      {nodes.map((node, index) => (
        <Fragment key={index}>
          <PathStackNode node={node} level={level} />
        </Fragment>
      ))}
    </div>
  );
};

export default PathStackRow;
