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

const MediaTypeSelector = ({ header = false }) => {
  const pathNodes = useSessionStore((state) => state.pathNodes);
  const resetRootNode = useSessionStore((state) => state.resetRootNode);
  const clearSearchQueryString = useSessionStore(
    (state) => state.clearSearchQueryString
  );
  return (
    <div
      className={clsx(
        "grid flex-1 grid-flow-col grid-cols-5 gap-4 lg:gap-10 px-4 py-2 lg:px-10 xl:px-20 h-full",
        header && pathNodes.length === 0 && "invisible"
      )}
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
            <div className="col-span-1 flex justify-evenly h-full items-center">
              <Button
                onClick={() => {
                  resetRootNode(id);
                  clearSearchQueryString();
                  trackAction("mediaTypeSelectorClick", generateURL([id]));
                }}
                id={removePrefix(id)}
                dangerouslySetInnerHTML={{ __html: label }}
                className={clsx(
                  " aspect-square hover:brighter rounded-full font-noto font-bold text-white ",
                  header
                    ? `h-full max-h-36 text-lg xl:text-2xl`
                    : `w-full max-w-72 text-2xl xl:text-3xl`
                )}
                style={{
                  backgroundColor: Color(getNodeColor(id, "primary")).alpha(
                    pathNodes?.length === 0 ? 1 : 0.6
                  ),
                }}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default MediaTypeSelector;
