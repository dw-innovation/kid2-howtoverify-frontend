import React, { Fragment } from "react";
import { ROOTNODES } from "@/lib/const";
import Button from "@/components/button";
import {
  generateURL,
  getNodeColor,
  removePrefix,
  trackAction,
} from "@/lib/lib";
import clsx from "clsx";
import Color from "color";
import useSessionStore from "@/lib/stores/useSessionStore";

const MediaTypeSelector = () => {
  const pathNodes = useSessionStore((state) => state.pathNodes);
  const resetRootNode = useSessionStore((state) => state.resetRootNode);
  const clearSearchQueryString = useSessionStore(
    (state) => state.clearSearchQueryString
  );
  return (
    <div
      className="flex flex-1 flex-row items-center justify-center px-6"
      id="featureTour-2"
    >
      {ROOTNODES.map(({ id, label }, index) => (
        <Fragment key={index}>
          {id !== pathNodes[0] && (
            <Button
              onClick={() => {
                resetRootNode(id);
                clearSearchQueryString();
                trackAction("mediaTypeSelectorClick", generateURL([id]));
              }}
              id={removePrefix(id)}
              dangerouslySetInnerHTML={{ __html: label }}
              className={clsx(
                "hover:brighter m-2 rounded-full font-noto font-bold text-white",
                pathNodes?.length === 0
                  ? `h-[8rem] w-[8rem] text-2xl xl:h-[12rem] xl:w-[12rem] xl:text-3xl`
                  : `h-[5rem] w-[5rem] text-xl xl:h-[8rem] xl:w-[8rem] xl:text-2xl`
              )}
              style={{
                backgroundColor: Color(getNodeColor(id, "primary")).alpha(
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
