import React, { useState } from "react";
import About from "../about";
import SearchBox from "../searchBox";
import NodeInfo from "../nodeInfo";
import clsx from "clsx";
import { getNodeColor } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";
import Color from "color";

const Panel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();
  return (
    <div
      className={clsx(
        "p-2 flex gap-3 flex-col z-50 relative",
        isOpen ? "w-[30rem]" : "w-[1.5rem]"
      )}
      style={{
        backgroundColor:
          Color(pathNodes?.length > 0 ? getNodeColor(pathNodes[0], "value") : "#000").alpha(0.06),
      }}
    >
      <button
        className="absolute top-0 bottom-0 left-0 -translate-x-1/2 bg-white h-max my-auto rounded-full shadow-sm font-bold"
        style={{ height: "2rem", width: "2rem" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? ">" : "<"}
      </button>
      {isOpen && (
        <>
          <SearchBox />
          <div className="flex flex-col flex-1 justify-between">
            <NodeInfo className="bg-blue" />
            <About className="bg-white" />
          </div>
        </>
      )}
    </div>
  );
};

export default Panel;
