import clsx from "clsx";
import React from "react";

const Button = ({ onClick, children, className = "" }) => (
  <button
    className={clsx(
      "bg-slate-200 p-2 m-2 hover:bg-slate-300 font-sans",
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
