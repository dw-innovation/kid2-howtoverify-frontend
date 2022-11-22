import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import MinusIcon from "src/assets/svg/minusIcon";
import PlusIcon from "src/assets/svg/plusIcon";
import { getNodeColor } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";

const Accordion = ({ title, children, open = true, isBlack, style = {} }) => {
  const [isOpen, setIsOpen] = useState(open);

  const {
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();

  const ref = useRef(null);

  const handleToggle = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [ref]);

  return (
    <details
      className="w-full font-montserrat"
      ref={ref}
      open={isOpen}
      style={style}
    >
      <summary
        className="font-bold text-xl cursor-pointer flex flex-row items-center px-6 py-4"
        style={{
          color: !isBlack ? getNodeColor(pathNodes[0], "value") : "#000",
          borderLeft: "3px solid",
          borderLeftColor: !isBlack
            ? getNodeColor(pathNodes[0], "value")
            : "#000",
        }}
        onClick={handleToggle}
      >
        <span className="flex-1">{title}</span>
        <span className="text-blue hover:brighter">
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </summary>
      <span className="py-4 block px-6">{children}</span>
    </details>
  );
};

export default Accordion;
