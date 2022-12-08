import React, { useState } from "react";
import NodeInfo from "../nodeInfo";
import clsx from "clsx";
import { getNodeColor } from "@/lib/lib";
import Color from "color";
import ArrowRight from "src/assets/svg/arrow";
import useSessionStore from "@/lib/stores/useSessionStore";

const Panel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathNodes = useSessionStore((state) => state.pathNodes);
  return (
    <div
      className={clsx(
        "p-2 flex gap-3 flex-col z-50 relative overflow-hidden",
        isOpen ? "md-[20rem] lg:w-[30rem]" : "w-[1.5rem]"
      )}
      style={{
        backgroundColor: Color(
          pathNodes?.length > 0 ? getNodeColor(pathNodes[0], "value") : "#000"
        ).alpha(0.06),
      }}
    >
      <button
        className="absolute top-0 bottom-0 z-20 left-0 -translate-x-1/2 bg-white hover:bg-blue hover:text-white transition-all duration-200 ease-in-out h-max my-auto rounded-full shadow-sm font-bold flex justify-center items-center"
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
      <div className={clsx(isOpen ? "flex flex-col h-full gap-2" : "hidden")}>
        <div className="flex flex-col flex-1 justify-between gap-2 overflow-y-scroll overflow-x-hidden">
          <NodeInfo
            style={{
              backgroundColor: Color(
                pathNodes?.length > 0
                  ? getNodeColor(pathNodes[0], "value")
                  : "#000"
              ).alpha(0.06),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Panel;
