import useAppContext from "src/lib/hooks/useAppContext";
import GraphRenderer from "src/components/graphRenderer";
import { loadGraph } from "@/lib/api/lib";
import { searchByNodes } from "@/lib/api/api/graphSearch";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import axios from "axios";

const IndexPage = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes, data },
    },
  } = useAppContext();

  const textareaRef = useRef(null);

  const [showData, setShowData] = useState(false);

  const fetchGraphData = async () => {
    const result = await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_GRAPH_API,
      headers: {
        "Content-Type": "application/json",
      },
      data: pathNodes,
    });

    setAppState((prev) => ({
      ...prev,
      graph: {
        ...prev.graph,
        data: result.data,
      },
    }));
  };

  useEffect(() => {
    fetchGraphData();

    /* loadGraph().then(() =>
      setAppState((prev) => ({
        ...prev,
        graph: {
          ...prev.graph,
          data: searchByNodes(pathNodes),
        },
      }))
    ); */
  }, [pathNodes]);

  /*  useEffect(() => {
    setAppState((prev) => ({
      ...prev,
      graph: {
        ...prev.graph,
        data: searchByNodes(pathNodes),
      },
    }));
  }, [pathNodes]); */

  return (
    <>
      <button
        className="bg-slate-200 p-2 m-2 hover:bg-slate-300 absolute top-0 right-0 z-10"
        onClick={() => setShowData(!showData)}
      >
        toggle data view
      </button>
      <div className="w-screen h-screen relative">
        <div className="flex h-full">
          <div className="h-full w-full">
            <GraphRenderer />
          </div>

          <pre
            className={clsx(
              "overflow-y-scroll h-screen w-[50%] text-[0.8rem] p-2 bg-amber-200",
              !showData && "hidden"
            )}
          >
            <b>Array of path nodes</b>
            <br />
            <div className="flex flex-col">
              <textarea cols={60} rows={10} ref={textareaRef}>
                {pathNodes}
              </textarea>
              <button
                onClick={() =>
                  setAppState((prev) => ({
                    ...prev,
                    graph: {
                      ...prev.graph,
                      pathNodes: textareaRef.current.value,
                    },
                  }))
                }
                className="bg-slate-200 p-2 m-2 hover:bg-slate-300 font-sans"
              >
                save
              </button>
            </div>
            <br />
            <br />
            <b>Graph data</b> <br />
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
