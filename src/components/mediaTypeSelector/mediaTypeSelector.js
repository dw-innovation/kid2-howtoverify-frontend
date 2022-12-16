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
      className="flex flex-1 flex-row items-center justify-center px-10"
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
                "hover:brighter m-2 2xl:mx-10 rounded-full font-noto font-bold text-white aspect-square h-full flex-1",
                pathNodes?.length === 0
                  ? `text-2xl xl:text-3xl`
                  : `text-xl xl:text-2xl`
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
