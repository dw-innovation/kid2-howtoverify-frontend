import React, { useState } from "react";
import About from "../about";
import SearchBox from "../searchBox";
import NodeInfo from "../nodeInfo";
import clsx from "clsx";
import { getNodeColor } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";
import Color from "color";
import SearchResults from "../searchResults";
import ArrowRight from "src/assets/svg/arrow";
import Footer from "../footer";

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
        "p-2 flex gap-3 flex-col z-50 relative max-h-screen",
        isOpen ? "md-[20rem] lg:w-[30rem]" : "w-[1.5rem]"
      )}
      style={{
        backgroundColor: Color(
          pathNodes?.length > 0 ? getNodeColor(pathNodes[0], "value") : "#000"
        ).alpha(0.06),
      }}
    >
      <button
        className="absolute top-0 bottom-0 left-0 -translate-x-1/2 bg-white hover:bg-blue hover:text-white transition-all duration-200 ease-in-out h-max my-auto rounded-full shadow-sm font-bold flex justify-center items-center"
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
        <div className="relative ">
          <SearchBox />
          <SearchResults />
        </div>
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
          <About className="bg-white" />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Panel;
