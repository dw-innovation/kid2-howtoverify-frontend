import React from "react";
import About from "../about";
import SearchBox from "../searchBox";
import NodeInfo from "../nodeInfo";

const Panel = () => {
  return (
    <div className="w-[30rem] bg-slate-200 p-2 flex gap-3 flex-col z-50 relative">
      <SearchBox />
      <div className="flex flex-col flex-1 justify-between">
      <NodeInfo />
      <About />
      </div>
    </div>
  );
};

export default Panel;
