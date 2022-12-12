import React, { Fragment } from "react";
import { ROOTNODES } from "@/lib/const";
import Button from "@/components/button";
import { generateURL, getNodeColor, trackAction } from "@/lib/lib";
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
    <div className="flex flex-row justify-center items-center px-6 flex-1">
      {ROOTNODES.map(({ id, label }, index) => (
        <Fragment key={index}>
          {id !== pathNodes[0] && (
            <Button
              onClick={() => {
                resetRootNode(id);
                clearSearchQueryString();
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
                backgroundColor: Color(
                  getNodeColor(id, "primary")
                ).alpha(pathNodes?.length === 0 ? 1 : 0.6),
              }}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default MediaTypeSelector;
