import useAppContext from "@/lib/hooks/useAppContext";
import { generateURL, trackAction } from "@/lib/lib";
import React, { Fragment } from "react";
import { isEqual } from "lodash";
import clsx from "clsx";
import useSessionStore from "@/lib/stores/useSessionStore";

const ResultItem = ({ item }) => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();

  const replacePathNodes = useSessionStore((state) => state.replacePathNodes);

  const itemPath = item.map(({ id }) => id);
  const itemPathLabels = item.map(({ name }) => name);

  return (
    <button
      onClick={() => {
        if (!isEqual(pathNodes, itemPath)) {
          replacePathNodes(itemPath);
          setAppState((prev) => ({
            ...prev,
            graph: { ...prev.graph, pathNodes: itemPath },
          }));
          trackAction("searchResultClick", generateURL(itemPath));
        } else {
          return null;
        }
      }}
      className={clsx(
        "block hover:text-blue text-left leading-4 my-2 text-sm",
        isEqual(pathNodes, itemPath) && "text-blue"
      )}
    >
      <div>
        {itemPathLabels.map((label, index) => (
          <Fragment key={index}>
            {index !== 0 && (
              <>
                {label}
                {itemPathLabels.length !== index + 1 && (
                  <span className="px-2">&gt;</span>
                )}
              </>
            )}
          </Fragment>
        ))}
      </div>
    </button>
  );
};

export default ResultItem;
