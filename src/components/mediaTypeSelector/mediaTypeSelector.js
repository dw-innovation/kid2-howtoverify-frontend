import React, { Fragment } from "react";
import { ROOTNODES } from "@/lib/const";
import useAppContext from "@/lib/hooks/useAppContext";
import Button from "../button";

const MediaTypeSelector = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();

  return (
    <>
      {pathNodes.length === 0 && (
        <span className="bg-pink-400 text-white p-2">
          select a media type first
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
            >
              {label}
            </Button>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default MediaTypeSelector;
