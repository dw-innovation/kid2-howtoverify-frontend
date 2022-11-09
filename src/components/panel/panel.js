import React, { useState } from "react";
import About from "../about";
import SearchBox from "../searchBox";
import NodeInfo from "../nodeInfo";
import clsx from "clsx";

const Panel = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={clsx(
        "bg-slate-200 p-2 flex gap-3 flex-col z-50 relative",
        isOpen ? "w-[30rem]" : "w-[1.5rem]"
      )}
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
            <NodeInfo />
            <About />
          </div>
        </>
      )}
    </div>
  );
};

export default Panel;
