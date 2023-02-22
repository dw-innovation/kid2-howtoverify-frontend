import React from "react";

const FooterLink = ({ innerHTML, onClickAction }) => (
  <a
    dangerouslySetInnerHTML={{ __html: innerHTML }}
    className="px-4 font-bold text-white cursor-pointer hover:underline"
    onClick={onClickAction}
  />
);

export default FooterLink;
