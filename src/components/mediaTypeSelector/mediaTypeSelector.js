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
      className="grid flex-1 grid-flow-col grid-cols-5 gap-4 px-4 lg:px-10 py-2"
      style={{
        gridTemplateColumns: `repeat(${
          pathNodes.length > 0 ? ROOTNODES.length - 1 : ROOTNODES.length
        }, minmax(0, 1fr))`,
      }}
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
                "hover:brighter col-span-1 aspect-square h-full rounded-full font-noto font-bold text-white",
                pathNodes?.length === 0
                  ? `text-2xl xl:text-3xl`
                  : `text-lg xl:text-2xl`
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
