import React from "react";

const ShareIcon = ({ width = 26 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    fill="none"
    viewBox="0 0 26 26"
  >
    <path
      fill="currentColor"
      d="M8.328 15.548c.66 0 1.295-.256 1.769-.715l5.05 2.527a2.552 2.552 0 10.76-1.521l-5.05-2.525c.013-.105.02-.21.02-.315 0-.104-.007-.209-.02-.313l5.05-2.526a2.546 2.546 0 10-.76-1.52l-5.05 2.525a2.548 2.548 0 10-1.769 4.383z"
    ></path>
    <circle cx="13" cy="13" r="12.5" stroke="currentColor"></circle>
  </svg>
);

export default ShareIcon;
