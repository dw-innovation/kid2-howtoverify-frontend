import React, { useRef, useState, useEffect } from "react";
import NodeInfo from "../nodeInfo";
import { getNodeColor } from "@/lib/lib";
import useSessionStore from "@/lib/stores/useSessionStore";
import useWindowSize from "@/lib/hooks/useWindowSize";

const Panel = () => {
  const [panelHeight, setPanelHeight] = useState(0);
  const ref = useRef(null);
  const pathNodes = useSessionStore((state) => state.pathNodes);
  const headerHeight = useSessionStore((state) => state.headerHeight);
  const footerHeight = useSessionStore((state) => state.footerHeight);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setPanelHeight(window.innerHeight - headerHeight - footerHeight);
  }, [ref, width, height]);

  return (
    <div
      className="relative z-50 flex max-h-full flex-col flex-nowrap gap-3 w-full md:w-[20rem] lg:w-[30rem]"
      style={{
        backgroundColor: getNodeColor(pathNodes[0], "background"),
      }}
      ref={ref}
    >
      <div
        className="flex-grow-0 block p-2 overflow-scroll"
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
