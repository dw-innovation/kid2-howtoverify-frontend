import { v4 as uuidv4 } from "uuid";
import useAppContext from "src/lib/hooks/useAppContext";
import GraphRenderer from "src/components/graphRenderer";
import { loadGraph } from "@/lib/api/lib";
import { searchByNodes } from "@/lib/api/api/graphSearch";
import { useEffect } from "react";

const IndexPage = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes, data },
    },
  } = useAppContext();

  useEffect(() => {
    loadGraph().then(() =>
      setAppState((prev) => ({
        ...prev,
        graph: {
          ...prev.graph,
          data: searchByNodes(pathNodes),
        },
      }))
    );
  }, []);

  useEffect(() => {
    setAppState((prev) => ({
      ...prev,
      graph: {
        ...prev.graph,
        data: searchByNodes(pathNodes),
      },
    }));
  }, [pathNodes]);

  return (
    <div className="w-screen h-screen relative">
      <div className="flex h-full">
        <div className="h-full w-full">
          <GraphRenderer />
        </div>

        <pre className="overflow-y-scroll h-screen w-[50%] text-sm">
          {JSON.stringify(pathNodes, null, 2)}
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default IndexPage;
