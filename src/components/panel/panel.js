import React from "react";
import About from "../about";
import SearchBox from "../searchBox";
import NodeInfo from "../nodeInfo";

const Panel = () => {
  return (
    <div className="w-[30rem] bg-slate-200 p-2 flex gap-3 flex-col">
      <SearchBox />
      <NodeInfo />
      <About />
    </div>
  );
};

export default Panel;
