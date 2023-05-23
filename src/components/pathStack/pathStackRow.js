import React, { Fragment, useEffect } from "react";
import PathStackNode from "./pathStackNode";
import useScroll from "@/lib/hooks/useScroll";
import ArrowRight from "src/assets/svg/arrow";
import { mapToRange } from "@/lib/lib";

const PathStackRow = ({ nodes, level }) => {
  const ref = React.useRef(null);

  const { left, right } = useScroll(ref);

  return (
    <div className="relative flex justify-center odd:bg-slate-200">
      <div className="flex gap-1 px-1 mx-auto overflow-x-scroll" ref={ref}>
        <div
          className="absolute top-0 bottom-0 left-[0.25rem] flex items-center shadow-sm rotate-180 z-20"
          style={{
            opacity: mapToRange(left, 0, 40, 0, 1),
          }}
        >
          <ArrowRight />
        </div>
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: "30px",
            background:
              "linear-gradient(to right, #fff 40%, rgba(0, 0, 0, 0) 100%)",
            opacity: mapToRange(left, 0, 40, 0, 1),
          }}
        />
        <div className="flex px-2" ref={ref}>
          {nodes.map((node, index) => (
            <Fragment key={index}>
              <PathStackNode node={node} level={level} />
            </Fragment>
          ))}
        </div>
        <div
          className="absolute top-0 bottom-0 right-[0.25rem] flex items-center shadow-sm z-20"
          style={{
            opacity: mapToRange(right, 40, 0, 1, 0),
          }}
        >
          <ArrowRight />
        </div>
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            width: "30px",
            background:
              "linear-gradient(to left, #fff 40%, rgba(0, 0, 0, 0) 100%)",
            opacity: mapToRange(right, 40, 0, 1, 0),
          }}
        />
      </div>
    </div>
  );
};

export default PathStackRow;
