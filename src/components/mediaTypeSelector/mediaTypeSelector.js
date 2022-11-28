import React, { Fragment } from "react";
import { ROOTNODES } from "@/lib/const";
import useAppContext from "@/lib/hooks/useAppContext";
import Button from "@/components/button";
import {
  generateURL,
  getNodeColor,
  trackAction,
} from "@/lib/lib";
import clsx from "clsx";
import Color from "color";

const MediaTypeSelector = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();

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
                  search: {
                    ...prev.search,
                    queryString: ""
                  }
                }));
                trackAction("mediaTypeSelectorClick", generateURL([id]));
              }}
              dangerouslySetInnerHTML={{ __html: label }}
              className={clsx(
                "rounded-full m-2 text-white font-bold hover:brighter font-noto",
                pathNodes?.length === 0
                  ? `w-[8rem] h-[8rem] xl:w-[12rem] xl:h-[12rem] text-2xl xl:text-3xl`
                  : `w-[5rem] h-[5rem] xl:w-[8rem] xl:h-[8rem] text-xl xl:text-2xl`
              )}
              style={{
                backgroundColor: Color(getNodeColor(id, "value")).alpha(
                  pathNodes?.length === 0 ? 1 : 0.6
                ),
              }}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default MediaTypeSelector;
