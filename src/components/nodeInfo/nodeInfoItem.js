import useTranslation from "next-translate/useTranslation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { trackAction } from "@/lib/lib";
import { REACTMARKDOWNCOMPONENTS } from "@/lib/components";

const NodeInfoItem = ({ name, body }) => {
  const { t } = useTranslation("nodeInfo");

  const parseBody = (body) => {
    if (typeof body === "string") {
      return body.replace(/\\-/g, "-");
    }
    if (typeof body === "object") {
      return body.length === 1 ? body[0] : body.map((item) => `- ${item}`).join("\n");
    }
  };

  return (
    <>
      {body !== "" && body !== null && (
        <div className="flex flex-col pb-2">
          {name !== "comment" && (
            <h3
              dangerouslySetInnerHTML={{ __html: t(name) }}
              className="font-bold"
            />
          )}
          {name === "applicationUrl" ? (
            <a
              href={body}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-primary hover:underline"
              onClick={() => {
                trackAction("externalLink", body);
              }}
            >
              {body}
            </a>
          ) : (
            <ReactMarkdown children={parseBody(body)} components={REACTMARKDOWNCOMPONENTS} />
          )}
        </div>
      )}
    </>
  );
};

export default NodeInfoItem;
