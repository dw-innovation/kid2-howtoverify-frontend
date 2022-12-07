import React, { Fragment, useEffect, useState } from "react";
import useAppContext from "@/lib/hooks/useAppContext";
import NodeInfoItem from "./nodeInfoItem";
import { SAFELIST } from "@/lib/const";
import Accordion from "../accordion";
import useTranslation from "next-translate/useTranslation";
import ReactMarkdown from "react-markdown";
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
  const [lastNode, setLastNode] = useState(undefined);

  useEffect(() => {
    nodes.filter(({ id }) => pathNodes.at(-1) === id)[0]
      ? setLastNode(nodes.filter(({ id }) => pathNodes.at(-1) === id)[0])
      : setLastNode(undefined);
  }, [nodes, pathNodes]);

  return (
    <>
      {lastNode !== undefined ? (
        <Accordion title={lastNode["name"]} className={className} style={style}>
          {Object.keys(lastNode).map((property, index) => (
            <Fragment key={index}>
              {SAFELIST.includes(property) ? (
                <NodeInfoItem name={property} body={lastNode[property]} />
              ) : (
                <></>
              )}
            </Fragment>
          ))}
        </Accordion>
      ) : (
        <Accordion
          title={t("introTitle")}
          style={{ backgroundColor: "#fff" }}
          isBlack
        >
          <ReactMarkdown children={t("introText")} className="nodeInfo" />
        </Accordion>
      )}
    </>
  );
};

export default NodeInfo;
