import useAppContext from "@/lib/hooks/useAppContext";
import { generateURL, trackAction } from "@/lib/lib";
import React, { Fragment } from "react";
import { isEqual } from "lodash";
import clsx from "clsx";

const ResultItem = ({ item }) => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();
  
  const itemPath = item.map(({ id }) => id);
  const itemPathLabels = item.map(({ label }) => label);

  return (
    <button
      onClick={() => {
        setAppState((prev) => ({
          ...prev,
          graph: { ...prev.graph, pathNodes: itemPath },
        }));
        trackAction("searchResultClick", generateURL(itemPath));
      }}
      className={clsx(
        "block hover:text-blue",
        isEqual(pathNodes, itemPath) && "text-blue"
      )}
    >
      {itemPathLabels.map((label, index) => (
        <Fragment key={index}>
          {label}
          {itemPathLabels.length !== index + 1 && (
            <span className="px-2">&gt;</span>
          )}
        </Fragment>
      ))}
    </button>
  );
};

export default ResultItem;
