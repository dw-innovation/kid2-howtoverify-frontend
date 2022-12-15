import React, { Fragment, useEffect, useState } from "react";
import useAppContext from "@/lib/hooks/useAppContext";
import NodeInfoItem from "./nodeInfoItem";
import { SAFELIST } from "@/lib/const";
import Accordion from "../accordion";
import useTranslation from "next-translate/useTranslation";
import ReactMarkdown from "react-markdown";
import { REACTMARKDOWNCOMPONENTS } from "@/lib/components";
import useSessionStore from "@/lib/stores/useSessionStore";

const NodeInfo = ({ className, style }) => {
  const {
    appState: {
      graph: {
        data: { nodes },
      },
    },
  } = useAppContext();

  const pathNodes = useSessionStore((state) => state.pathNodes);

  const { t } = useTranslation("common");
  const [currentNode, setCurrentNode] = useState(undefined);

  useEffect(() => {
    nodes.filter(({ id }) => pathNodes[pathNodes.length - 1] === id)[0] &&
      setCurrentNode(
        nodes.filter(({ id }) => pathNodes[pathNodes.length - 1] === id)[0]
      );
    pathNodes.length === 0 && setCurrentNode(undefined);
  }, [nodes, pathNodes]);

  return (
    <>
      {currentNode !== undefined ? (
        <Accordion
          title={currentNode["name"]}
          className={className}
          style={style}
        >
          {Object.keys(currentNode).map((property, index) => (
            <Fragment key={index}>
              {SAFELIST.includes(property) ? (
                <NodeInfoItem name={property} body={currentNode[property]} />
              ) : (
                <></>
              )}
            </Fragment>
          ))}
        </Accordion>
      ) : (
        <Accordion title={t("introTitle")} style={{ backgroundColor: "#fff" }}>
          <ReactMarkdown
            children={t("introText")}
            className="nodeInfo"
            components={REACTMARKDOWNCOMPONENTS}
          />
        </Accordion>
      )}
    </>
  );
};

export default NodeInfo;
