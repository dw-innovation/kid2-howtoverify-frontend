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
        "flex items-center justify-center",
        !header && "w-full mx-1",
        header && pathNodes.length === 0 && "invisible"
      )}
    >
      <div
        id={!header ? "featureTour-2" : undefined}
        className={clsx(
          "grid grid-flow-col grid-cols-5 gap-4 px-2 py-2 lg:gap-10 lg:px-4 xl:px-10"
        )}
        style={{
          gridTemplateColumns: `repeat(${
            pathNodes.length > 0 ? ROOTNODES.length - 1 : ROOTNODES.length
          }, minmax(0, 1fr))`,
          width: "calc(100% - 2rem)"
        }}
      >
        {ROOTNODES.map(({ id, label }, index) => (
          <Fragment key={index}>
            {id !== pathNodes[0] && (
              <div className="col-span-1 flex h-full items-center justify-evenly">
                <Button
                  onClick={() => {
                    resetRootNode(id);
                    clearSearchQueryString();
                    trackAction("mediaTypeSelectorClick", generateURL([id]));
                  }}
                  id={!header ? removePrefix(id) : undefined}
                  dangerouslySetInnerHTML={{ __html: label }}
                  className={clsx(
                    "hover:brighter aspect--1-1 rounded-full font-noto font-bold text-white flex justify-center items-center",
                    header
                      ? `p-2 w-20 xl:w-24 h-20 xl:h-24 text-lg xl:text-xl`
                      : `p-2 2xl:p-5 max-w-[72rem] w-full text-md xl:text-2xl 2xl:text-3xl`
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
    </div>
  );
};

export default MediaTypeSelector;
