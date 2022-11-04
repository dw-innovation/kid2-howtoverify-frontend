import React, { Fragment } from "react";
import ShareButton from "../shareButton";
import TrailItem from "./trailItem";

const Trail = ({ pathNodes }) => {
  return (
    <div className="flex gap-2">
      <div>
        {pathNodes.length > 0 &&
          pathNodes.map((node, index) => (
            <Fragment key={index}>
              <TrailItem id={node} position={index} />
              {index + 1 < pathNodes.length && (
                <span className="font-bold px-2">&gt;</span>
              )}
            </Fragment>
          ))}
      </div>
      <ShareButton />
    </div>
  );
};

export default Trail;
