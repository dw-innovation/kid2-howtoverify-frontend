import { v4 as uuidv4 } from "uuid";
import useAppContext from "src/lib/hooks/useAppContext";
import GraphRenderer from "src/components/graphRenderer";
import {load} from "../src/lib/api/graphSearch";
import { useEffect } from "react";

const IndexPage = () => {
  const { setAppState } = useAppContext();

  useEffect(() => {
      load();
  }, [])

  return (
    <div className="w-screen h-screen relative">
      <button
        onClick={() => {
          const uuid = uuidv4();
          setAppState((prev) => ({
            ...prev,
            graph: {
              ...prev.graph,
              data: {
                nodes: [
                  ...prev.graph.data.nodes,
                  {
                    id: uuid,
                    name: "Image",
                    type: "inputType",
                  },
                ],
                links: [
                  ...prev.graph.data.links,
                  {
                    source: "t-10",
                    target: uuid,
                  },
                ],
              },
            },
          }));
        }}
        className="py-2 px-4 bg-slate-200 hover:bg-slate-600 absolute top-0 left-0"
      >
        add
      </button>
      <GraphRenderer />
    </div>
  );
};

export default IndexPage;
