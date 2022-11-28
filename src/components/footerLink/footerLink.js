import React from "react";

const FooterLink = ({ innerHTML, onClickAction }) => (
  <a
    dangerouslySetInnerHTML={{ __html: innerHTML }}
    className="text-blue hover:brighter cursor-pointer"
    onClick={onClickAction}
  />
);

export default FooterLink;
