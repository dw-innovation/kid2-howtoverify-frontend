import React from "react";

const Button = ({
  onClick,
  className = "",
  dangerouslySetInnerHTML = {},
  style,
  id,
}) => (
  <button
    className={className}
    onClick={onClick}
    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    style={style}
    id={id}
  />
);

export default Button;
