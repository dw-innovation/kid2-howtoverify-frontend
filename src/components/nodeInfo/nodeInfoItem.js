import useTranslation from "next-translate/useTranslation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { trackAction } from "@/lib/lib";

const NodeInfoItem = ({ name, body }) => {
  const { t } = useTranslation("nodeInfo");

  const parseBody = (body) => {
    const parsedBody = "";
    try {
      parsedBody = JSON.parse(
        body
          .replaceAll("['", '["')
          .replaceAll("', '", '", "')
          .replaceAll("']", '"]')
      );
      parsedBody = parsedBody.map((item) => `- ${item}`);
      parsedBody = parsedBody.join("\n");
    } catch {
      parsedBody = body;
    }
    return parsedBody;
  };

  return (
    <>
      {body !== "" && body !== null && (
        <div className="flex flex-col pb-2">
          {name !== "comment" && (
            <span
              dangerouslySetInnerHTML={{ __html: t(name) }}
              className="font-bold"
            />
          )}
          {name === "applicationUrl" ? (
            <a
              href={body}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:underline"
              onClick={() => {
                trackAction("externalLink", body);
              }}
            >
              {body}
            </a>
          ) : (
            <ReactMarkdown children={parseBody(body)} />
          )}
        </div>
      )}
    </>
  );
};

export default NodeInfoItem;
