import React, { Fragment } from "react";
import PathStackNode from "./pathStackNode";

const PathStackRow = ({ nodes, level }) => {
  return (
    <div className="flex justify-center w-full gap-2 px-2 overflow-x-scroll odd:bg-slate-200">
      {nodes.map((node, index) => (
        <Fragment key={index}>
          <PathStackNode node={node} level={level} />
        </Fragment>
      ))}
    </div>
  );
};

export default PathStackRow;
