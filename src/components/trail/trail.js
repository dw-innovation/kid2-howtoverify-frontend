import useAppContext from "@/lib/hooks/useAppContext";
import React, { Fragment } from "react";
import ShareButton from "../shareButton";
import TrailItem from "./trailItem";

const Trail = () => {
  const {
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();
  return (
    <div className="flex gap-2">
      <div>
        {pathNodes.map((node, index) => (
          <Fragment key={index}>
            <TrailItem id={node} position={index} />
            {index + 1 < pathNodes.length && (
              <span className="font-bold px-2">–</span>
            )}
          </Fragment>
        ))}
      </div>
      <ShareButton />
    </div>
  );
};

export default Trail;
