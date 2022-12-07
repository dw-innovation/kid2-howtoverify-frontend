import React from "react";
import { getNodeColor } from "@/lib/lib";
import useSessionStore from "@/lib/stores/useSessionStore";

const Accordion = ({ title, children, isBlack, style = {} }) => {
  const pathNodes = useSessionStore((state) => state.pathNodes);

  return (
    <details className="w-full font-montserrat" style={style} open>
      <summary
        className="font-bold text-xl 2xl:text-2xl cursor-pointer flex flex-row items-center px-6 py-4"
        style={{
          color: !isBlack ? getNodeColor(pathNodes[0], "value") : "#000",
          borderLeft: "3px solid",
          borderLeftColor: !isBlack
            ? getNodeColor(pathNodes[0], "value")
            : "#000",
        }}
      >
        <span className="flex-1">{title}</span>
      </summary>
      <span className="py-4 block px-6 text-md 2xl:text-lg">{children}</span>
    </details>
  );
};

export default Accordion;
