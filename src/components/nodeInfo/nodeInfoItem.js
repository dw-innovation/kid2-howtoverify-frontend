import useTranslation from "next-translate/useTranslation";
import React from "react";

const NodeInfoItem = ({ name, body }) => {
  const { t } = useTranslation("nodeInfo");

  return (
    <>
      {body !== "" && (
        <div className="flex flex-col pb-2">
          {name !== "comment" && (
            <span
              dangerouslySetInnerHTML={{ __html: t(name) }}
              className="font-bold"
            />
          )}
          {name === "applicationUrl" ? (
            <a href={body} target="_blank" rel="noopener noreferrer">
              {body}
            </a>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: body }} />
          )}
        </div>
      )}
    </>
  );
};

export default NodeInfoItem;
