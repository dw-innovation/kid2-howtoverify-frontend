import React, { useRef, useState, useEffect } from "react";
import NodeInfo from "../nodeInfo";
import clsx from "clsx";
import { getNodeColor } from "@/lib/lib";
import useSessionStore from "@/lib/stores/useSessionStore";
import useWindowSize from "@/lib/hooks/useWindowSize";

const Panel = () => {
  const [panelHeight, setPanelHeight] = useState(0);
  const ref = useRef(null);
  const pathNodes = useSessionStore((state) => state.pathNodes);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setPanelHeight(ref?.current?.clientHeight);
  }, [ref, width, height]);

  return (
    <div
      className="relative z-50 flex max-h-full flex-col flex-nowrap gap-3 md-[20rem] w-[20rem] lg:w-[30rem]"
      style={{
        backgroundColor: getNodeColor(pathNodes[0], "background"),
      }}
      ref={ref}
    >
      <div
        className="block flex-grow-0 overflow-scroll p-2"
        style={{ maxHeight: `${panelHeight}px` }}
      >
        <NodeInfo
          style={{
            backgroundColor: getNodeColor(pathNodes[0], "nodeInfo"),
          }}
        />
      </div>
    </div>
  );
};

export default Panel;
