import clsx from "clsx";
import React from "react";

const Button = ({
  onClick,
  children,
  className = "",
  dangerouslySetInnerHTML = {},
}) => (
  <button
    className={clsx("font-sans", className)}
    onClick={onClick}
    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
  />
);

export default Button;
