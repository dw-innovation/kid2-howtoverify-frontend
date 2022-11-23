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
    <div className="flex items-center">
      <div className="font-noto font-bold pr-2">Trail:</div>
      {pathNodes.map((node, index) => (
        <Fragment key={index}>
          <TrailItem id={node} position={index} />
          {index + 1 < pathNodes.length && (
            <span className="font-bold px-2 font-noto">–</span>
          )}
        </Fragment>
      ))}
      <div className="pl-2 flex items-center">
        <ShareButton />
      </div>
    </div>
  );
};

export default Trail;
