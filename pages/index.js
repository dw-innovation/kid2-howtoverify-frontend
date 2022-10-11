import useAppContext from "src/lib/hooks/useAppContext";
import GraphRenderer from "src/components/graphRenderer";
import { loadGraph } from "@/lib/api/lib";
import { searchByNodes } from "@/lib/api/api/graphSearch";
import { useEffect, useState, useRef, Fragment } from "react";
import clsx from "clsx";
import axios from "axios";
import Button from "@/components/button";

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
    console.log(pathNodes);
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

  const ROOTNODES = [
    { label: "image", id: "http://dw.com/image" },
    { label: "video", id: "http://dw.com/video" },
    { label: "audio", id: "http://dw.com/audio" },
    { label: "text", id: "http://dw.com/text" },
  ];

  return (
    <>
      <Button
        className="absolute top-0 right-0 z-10"
        onClick={() => setShowData(!showData)}
      >
        toggle show data
      </Button>
      <div className="w-screen h-screen relative">
        <div className="flex h-full">
          <div className="h-full w-full">
            <div className="flex flex-row">
              {ROOTNODES.map((node, index) => (
                <Fragment key={index}>
                  <Button
                    onClick={() =>
                      setAppState((prev) => ({
                        ...prev,
                        graph: {
                          ...prev.graph,
                          pathNodes: JSON.stringify({
                            click_history: [node.id],
                          }),
                        },
                      }))
                    }
                  >
                    {node.label}
                  </Button>
                </Fragment>
              ))}
            </div>
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
              <textarea
                cols={60}
                rows={10}
                ref={textareaRef}
                value={pathNodes}
              />
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
