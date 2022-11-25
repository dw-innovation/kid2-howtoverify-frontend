import useAppContext from "@/lib/hooks/useAppContext";
import clsx from "clsx";
import React, { Fragment } from "react";
import ShareButton from "../shareButton";
import TrailItem from "./trailItem";

const Trail = () => {
  const {
    appState: {
      graph: { pathNodes },
    },
    setAppState,
  } = useAppContext();
  return (
    <div className="flex items-center text-sm md:text-md lg:text-lg">
      <div className="font-noto font-bold pr-2">Trail:</div>
      <button
        className={clsx(
          "font-noto",
          pathNodes.length === 0
            ? "cursor-default font-bold text-black"
            : "font-noto text-[#737373] hover:text-blue"
        )}
        onClick={() =>
          setAppState((prev) => ({
            ...prev,
            graph: { ...prev.graph, pathNodes: [] },
          }))
        }
      >
        Home
      </button>
      {pathNodes.map((node, index) => (
        <Fragment key={index}>
          {index < pathNodes.length && (
            <span className="font-bold px-2 font-noto">–</span>
          )}
          <TrailItem id={node} position={index} />
        </Fragment>
      ))}
      <div className="pl-2 flex items-center">
        <ShareButton />
      </div>
    </div>
  );
};

export default Trail;
