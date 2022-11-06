import React, { Fragment } from "react";
import { ROOTNODES } from "@/lib/const";
import useAppContext from "@/lib/hooks/useAppContext";
import Button from "@/components/button";
import useTranslation from "next-translate/useTranslation";
import { getNodeColor, removePrefix } from "@/lib/lib";
import clsx from "clsx";

const MediaTypeSelector = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();

  const { t } = useTranslation("common");

  return (
    <div className="flex flex-row flex-1 justify-center items-center">
      {ROOTNODES.map(({ id, label }, index) => (
        <Fragment key={index}>
          {id !== pathNodes[0] && (
            <Button
              onClick={() => {
                setAppState((prev) => ({
                  ...prev,
                  graph: {
                    ...prev.graph,
                    pathNodes: [id],
                  },
                }));
                typeof window !== "undefined" &&
                  window.history.pushState(
                    {},
                    `/${removePrefix(id)}`,
                    `/${removePrefix(id)}`
                  );
              }}
              dangerouslySetInnerHTML={{ __html: label }}
              className={clsx(
                `rounded-full h-[5rem] w-[5rem] bg-${getNodeColor(
                  id,
                  "name"
                )} m-2 text-white font-bold`
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default MediaTypeSelector;
