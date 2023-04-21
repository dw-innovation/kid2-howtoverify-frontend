import React from "react";
import { getNodeColor } from "@/lib/lib";
import useSessionStore from "@/lib/stores/useSessionStore";

const Accordion = ({ title, children, style = {} }) => {
  const pathNodes = useSessionStore((state) => state.pathNodes);

  return (
    <div
      className="w-full font-montserrat"
      style={style}
      open
      id="featureTour-5"
    >
      <div
        className="flex flex-row items-center px-6 py-4 text-xl font-bold 2xl:text-2xl"
        style={{
          color: getNodeColor(pathNodes[0], "primary"),
          borderLeft: "3px solid",
          borderLeftColor: getNodeColor(pathNodes[0], "primary"),
        }}
      >
        <h2 className="flex-1">{title}</h2>
      </div>
      <span className="block px-6 py-4 text-md 2xl:text-lg">{children}</span>
    </div>
  );
};

export default Accordion;
