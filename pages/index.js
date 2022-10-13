import { useEffect, useState, Fragment } from "react";
import { ROOTNODES } from "@/lib/const";
import useAppContext from "@/lib/hooks/useAppContext";
import GraphRenderer from "@/components/graphRenderer";
import clsx from "clsx";
import axios from "axios";
import Button from "@/components/button";
import { useRouter } from "next/router";

const IndexPage = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes, data },
    },
  } = useAppContext();

  const [tempPathNodes, setTempPathNodes] = useState("");

  const [showData, setShowData] = useState(false);

  const { query } = useRouter();

  useEffect(() => {
    if (typeof query.path !== "undefined" && query?.path.length > 0) {
      const queryPath = query.path.map((item) => `http://dw.com/${item}`);

      setAppState((prev) => ({
        ...prev,
        graph: { ...prev.graph, pathNodes: queryPath },
      }));
    }
  }, [query]);

  const fetchGraphData = async () => {
    const result = await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_GRAPH_API,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ click_history: pathNodes }),
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
    if (pathNodes.length !== 0) {
      fetchGraphData();
      setTempPathNodes(JSON.stringify(pathNodes));

      const urlPath = `/${pathNodes
        .map((node) => node.replace("http://dw.com/", ""))
        .join("/")}`;

      window.history.pushState({}, urlPath, urlPath);
    }
  }, [pathNodes]);

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
              {ROOTNODES.map(({ id, label }, index) => (
                <Fragment key={index}>
                  <Button
                    onClick={() =>
                      setAppState((prev) => ({
                        ...prev,
                        graph: {
                          ...prev.graph,
                          pathNodes: [id],
                        },
                      }))
                    }
                  >
                    {label}
                  </Button>
                </Fragment>
              ))}
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="font-bold"
              >
                copy link to share
              </Button>
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
                value={tempPathNodes}
                onChange={(e) => setTempPathNodes(e.target.value)}
              />
              <button
                onClick={() =>
                  setAppState((prev) => ({
                    ...prev,
                    graph: {
                      ...prev.graph,
                      pathNodes: JSON.parse(tempPathNodes),
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
