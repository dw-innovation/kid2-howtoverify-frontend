import React, { useRef, useState, useEffect } from "react";
import NodeInfo from "../nodeInfo";
import clsx from "clsx";
import { getNodeColor } from "@/lib/lib";
import ArrowRight from "src/assets/svg/arrow";
import useSessionStore from "@/lib/stores/useSessionStore";
import useWindowSize from "@/lib/hooks/useWindowSize";

const Panel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [panelHeight, setPanelHeight] = useState(0);
  const ref = useRef(null);
  const pathNodes = useSessionStore((state) => state.pathNodes);
  const { width, heigth } = useWindowSize();

  useEffect(() => {
    setPanelHeight(ref?.current?.clientHeight);
  }, [ref, width, heigth]);

  return (
    <div
      className={clsx(
        "flex gap-3 flex-col z-50 relative flex-nowrap max-h-full",
        isOpen ? "md-[20rem] lg:w-[30rem]" : "w-[1.5rem]"
      )}
      style={{
        backgroundColor:
          pathNodes?.length > 0
            ? getNodeColor(pathNodes[0], "background")
            : "#000",
      }}
      ref={ref}
    >
      <button
        className="-translate-x-1/2 absolute top-0 bottom-0 z-20 left-0 bg-blue-primary hover:bg-white text-white hover:text-blue-primary transition-all duration-200 ease-in-out h-max my-auto rounded-full shadow-sm font-bold flex justify-center items-center"
        style={{ height: "2rem", width: "2rem" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ArrowRight />
        ) : (
          <div className="rotate-180">
            <ArrowRight />
          </div>
        )}
      </button>
      <div
        className={clsx(
          isOpen ? "block overflow-scroll flex-grow-0 p-2" : "hidden"
        )}
        style={{ maxHeight: `${panelHeight}px` }}
      >
        <NodeInfo
          style={{
            backgroundColor:
              pathNodes?.length > 0
                ? getNodeColor(pathNodes[0], "nodeInfo")
                : "#000",
          }}
        />
      </div>
    </div>
  );
};

export default Panel;
