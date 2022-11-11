import useAppContext from "@/lib/hooks/useAppContext";
import { generateURL, trackAction } from "@/lib/lib";
import React, { Fragment } from "react";

const ResultItem = ({ item }) => {
  const { setAppState } = useAppContext();
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
      className="block hover:text-blue"
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
