import clsx from "clsx";
import React from "react";

const Button = ({
  onClick,
  className = "",
  dangerouslySetInnerHTML = {},
  style
}) => (
  <button
    className={className}
    onClick={onClick}
    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    style={style}
  />
);

export default Button;
