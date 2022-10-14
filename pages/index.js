import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchGraphData } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";
import GraphRenderer from "@/components/graphRenderer";
import Button from "@/components/button";
import MediaTypeSelector from "@/components/mediaTypeSelector";
import DevPanel from "@/components/devPanel";
import ShareButton from "@/components/shareButton";
import FeedbackButton from "@/components/feedbackButton";

const IndexPage = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();

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

  useEffect(() => {
    if (pathNodes.length !== 0) {
      fetchGraphData(pathNodes, setAppState);
      setAppState((prev) => ({
        ...prev,
        tempPathNodes: JSON.stringify(pathNodes),
      }));

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
        onClick={() =>
          setAppState((prev) => ({ ...prev, showPanel: !prev.showPanel }))
        }
      >
        toggle show data
      </Button>
      <div className="w-screen h-screen relative">
        <div className="flex h-full">
          <div className="h-full w-full">
            <MediaTypeSelector />
            <ShareButton />
            <FeedbackButton />
            <GraphRenderer />
          </div>
          <DevPanel />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
