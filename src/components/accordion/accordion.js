import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import MinusIcon from "src/assets/svg/minusIcon";
import PlusIcon from "src/assets/svg/plusIcon";
import { getNodeColor } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";

const Accordion = ({ title, children, open = true, className, style = {} }) => {
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
      className={clsx("w-full font-montserrat", className)}
      ref={ref}
      open={isOpen}
      style={style}
    >
      <summary
        className="font-bold text-xl cursor-pointer flex flex-row items-center px-6 py-4"
        style={{
          color: getNodeColor(pathNodes[0], "value"),
          borderLeft: "3px solid",
          borderLeftColor: getNodeColor(pathNodes[0], "value"),
        }}
        onClick={handleToggle}
      >
        <span className="flex-1">{title}</span>
        <span>{isOpen ? <MinusIcon /> : <PlusIcon />}</span>
      </summary>
      <span className="py-4 block px-6">{children}</span>
    </details>
  );
};

export default Accordion;
