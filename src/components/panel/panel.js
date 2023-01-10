import React, { useRef, useState, useEffect } from "react";
import NodeInfo from "../nodeInfo";
import clsx from "clsx";
import { getNodeColor } from "@/lib/lib";
import ArrowRight from "src/assets/svg/arrow";
import useSessionStore from "@/lib/stores/useSessionStore";
import useWindowSize from "@/lib/hooks/useWindowSize";

const Panel = () => {
  const [notify, setNotify] = useState(false);
  const showPanel = useSessionStore((state) => state.showPanel);
  const togglePanel = useSessionStore((state) => state.togglePanel);
  const [panelHeight, setPanelHeight] = useState(0);
  const ref = useRef(null);
  const pathNodes = useSessionStore((state) => state.pathNodes);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setPanelHeight(ref?.current?.clientHeight);
  }, [ref, width, height]);

  useEffect(() => {
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
    }, 2000);
  }, [pathNodes]);

  return (
    <div
      className={clsx(
        "relative z-50 flex max-h-full flex-col flex-nowrap gap-3",
        showPanel ? "md-[20rem] lg:w-[30rem]" : "w-[1.5rem]"
      )}
      style={{
        backgroundColor: getNodeColor(pathNodes[0], "background"),
      }}
      ref={ref}
    >
      <button
        className={clsx(
          "absolute top-0 bottom-0 left-0 z-20 my-auto flex h-max -translate-x-1/2 items-center justify-center rounded-full bg-blue-primary font-bold text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-white hover:text-blue-primary", notify && "animate-pulse"
        )}
        style={{ height: "2rem", width: "2rem" }}
        onClick={() => togglePanel(!showPanel)}
        role="button"
        aria-label="Toggle panel"
      >
        {showPanel ? (
          <ArrowRight />
        ) : (
          <div className="rotate-180">
            <ArrowRight />
          </div>
        )}
      </button>
      <div
        className={clsx(
          showPanel ? "block flex-grow-0 overflow-scroll p-2" : "hidden"
        )}
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
