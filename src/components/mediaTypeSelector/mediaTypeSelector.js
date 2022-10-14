import React, { Fragment } from "react";
import { ROOTNODES } from "@/lib/const";
import useAppContext from "@/lib/hooks/useAppContext";
import Button from "@/components/button";
import useTranslation from "next-translate/useTranslation";

const MediaTypeSelector = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();

  const { t } = useTranslation("common");

  return (
    <>
      {pathNodes.length === 0 && (
        <span className="bg-pink-400 text-white p-2">
          {t("selectMediaType")}
        </span>
      )}
      <div className="flex flex-row">
        {ROOTNODES.map(({ id, label }, index) => (
          <Fragment key={index}>
            <Button
              onClick={() =>
                setAppState((prev) => ({
                  ...prev,
                  graph: {
                    ...prev.graph,
                    pathNodes: [id],
                  },
                }))
              }
              dangerouslySetInnerHTML={{ __html: label }}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default MediaTypeSelector;
