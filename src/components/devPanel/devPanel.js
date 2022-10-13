import useAppContext from "@/lib/hooks/useAppContext";
import React from "react";
import clsx from "clsx";
import Button from "../button";

const DevPanel = () => {
  const {
    setAppState,
    appState: {
      graph: { data },
      showPanel,
      tempPathNodes,
    },
  } = useAppContext();

  return (
    <pre
      className={clsx(
        "overflow-y-scroll h-screen w-[50%] text-[0.8rem] p-2 bg-amber-200",
        !showPanel && "hidden"
      )}
    >
      <b>Array of path nodes</b>
      <br />
      <div className="flex flex-col">
        <textarea
          cols={60}
          rows={10}
          value={tempPathNodes}
          onChange={(e) =>
            setAppState((prev) => ({ ...prev, tempPathNodes: e.target.value }))
          }
        />
        <Button
          onClick={() =>
            setAppState((prev) => ({
              ...prev,
              graph: {
                ...prev.graph,
                pathNodes: JSON.parse(tempPathNodes),
              },
            }))
          }
        >
          save
        </Button>
      </div>
      <br />
      <br />
      <b>Graph data</b> <br />
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default DevPanel;
