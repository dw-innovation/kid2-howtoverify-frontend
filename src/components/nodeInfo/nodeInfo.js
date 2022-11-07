import React, { Fragment, useEffect, useRef, useState } from "react";
import useAppContext from "@/lib/hooks/useAppContext";
import NodeInfoItem from "./nodeInfoItem";
import { SAFELIST } from "@/lib/const";
import Accordion from "../accordion";
import useTranslation from "next-translate/useTranslation";

const NodeInfo = () => {
  const {
    appState: {
      graph: {
        data: { nodes },
        pathNodes,
      },
    },
  } = useAppContext();

  const { t } = useTranslation("common");
  const [lastNode, setLastNode] = useState(undefined);

  useEffect(() => {
    nodes.filter(({ id }) => pathNodes.at(-1) === id)[0] &&
      setLastNode(nodes.filter(({ id }) => pathNodes.at(-1) === id)[0]);
  }, [nodes]);

  return (
    <>
      {lastNode !== undefined ? (
        <Accordion title={lastNode["name"]}>
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
        <Accordion title={t("introTitle")}>{t("introText")}</Accordion>
      )}
    </>
  );
};

export default NodeInfo;
