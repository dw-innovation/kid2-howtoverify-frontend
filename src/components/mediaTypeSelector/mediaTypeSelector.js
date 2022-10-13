import React, { Fragment } from "react";
import { ROOTNODES } from "@/lib/const";
import useAppContext from "@/lib/hooks/useAppContext";
import Button from "../button";

const MediaTypeSelector = () => {
  const { setAppState } = useAppContext();

  return (
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
  );
};

export default MediaTypeSelector;
