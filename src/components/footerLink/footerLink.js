import React from "react";

const FooterLink = ({ innerHTML, onClickAction }) => (
  <a
    dangerouslySetInnerHTML={{ __html: innerHTML }}
    className="text-white hover:underline font-bold cursor-pointer px-4"
    onClick={onClickAction}
  />
);

export default FooterLink;
