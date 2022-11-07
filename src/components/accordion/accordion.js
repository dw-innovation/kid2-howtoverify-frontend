import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import MinusIcon from "src/assets/svg/minusIcon";
import PlusIcon from "src/assets/svg/plusIcon";

const Accordion = ({ title, children, open = true, className }) => {
  const [isOpen, setIsOpen] = useState(open);
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
      className={clsx("bg-teal-100 p-2 w-full", className)}
      ref={ref}
      open={isOpen}
      onClick={handleToggle}
    >
      <summary className="font-bold text-xl cursor-pointer flex flex-row text-blue items-center">
        <span className="flex-1">{title}</span>
        <span>{isOpen ? <MinusIcon /> : <PlusIcon />}</span>
      </summary>
      {children}
    </details>
  );
};

export default Accordion;
