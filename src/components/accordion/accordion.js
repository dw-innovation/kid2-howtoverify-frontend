import React from "react";
import { getNodeColor } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";

const Accordion = ({ title, children, open = true, isBlack, style = {} }) => {
  const {
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();

  return (
    <details className="w-full font-montserrat" style={style} open>
      <summary
        className="font-bold text-xl lg:text-2xl cursor-pointer flex flex-row items-center px-6 py-4"
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
      <span className="py-4 block px-6 text-lg lg:text-xl">{children}</span>
    </details>
  );
};

export default Accordion;
