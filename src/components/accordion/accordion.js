import React from "react";
import { getNodeColor } from "@/lib/lib";
import useSessionStore from "@/lib/stores/useSessionStore";

const Accordion = ({ title, children, style = {} }) => {
  const pathNodes = useSessionStore((state) => state.pathNodes);

  return (
    <details className="w-full font-montserrat" style={style} open>
      <summary
        className="font-bold text-xl 2xl:text-2xl cursor-pointer flex flex-row items-center px-6 py-4"
        style={{
          color: getNodeColor(pathNodes[0], "primary"),
          borderLeft: "3px solid",
          borderLeftColor: getNodeColor(pathNodes[0], "primary"),
        }}
      >
        <span className="flex-1">{title}</span>
      </summary>
      <span className="py-4 block px-6 text-md 2xl:text-lg">{children}</span>
    </details>
  );
};

export default Accordion;
