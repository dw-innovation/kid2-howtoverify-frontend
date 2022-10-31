import React from "react";

const NodeInfoItem = ({ name, body }) => (
  <>
    {body !== "" && (
      <div>
        <span
          dangerouslySetInnerHTML={{ __html: name }}
          className="font-bold pr-2"
        />
        <span dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    )}
  </>
);

export default NodeInfoItem;
