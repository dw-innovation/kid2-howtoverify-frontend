import { useEffect } from "react";
import { useRouter } from "next/router";
import { addPrefix, fetchGraphData } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";
import GraphRenderer from "@/components/graphRenderer";
import MediaTypeSelector from "@/components/mediaTypeSelector";
import ShareButton from "@/components/shareButton";
import FeedbackButton from "@/components/feedbackButton";
import useTranslation from "next-translate/useTranslation";
import useLocation from "@/lib/hooks/useLocation";
import NodeInfo from "@/components/nodeInfo";
import About from "@/components/about";
import Trail from "@/components/trail";

const IndexPage = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();

  const { t } = useTranslation("common");

  const { query } = useRouter();

  const location = typeof window !== "undefined" ? useLocation() : "";

  useEffect(() => {
    const pathArray = location.substring(1).split("/");

    if (pathArray[0] !== "") {
      const pathNodes = pathArray.map((item) => addPrefix(item));
      setAppState((prev) => ({
        ...prev,
        graph: { ...prev.graph, pathNodes: pathNodes },
      }));
    }
  }, [location]);

  useEffect(() => {
    if (typeof query.path !== "undefined" && query?.path.length > 0) {
      const queryPath = query.path.map((item) => addPrefix(item));

      setAppState((prev) => ({
        ...prev,
        graph: { ...prev.graph, pathNodes: queryPath },
      }));
    }
  }, [query]);

  useEffect(() => {
    if (typeof window !== "undefined" && pathNodes.length !== 0) {
      fetchGraphData(pathNodes, setAppState);
      setAppState((prev) => ({
        ...prev,
        tempPathNodes: JSON.stringify(pathNodes),
      }));
    }
  }, [pathNodes]);

  return (
    <>
      <div className="w-screen h-screen relative bg-lightGrey">
        <div className="absolute bottom-0 left-0 z-10 w-full p-2">
          {pathNodes.length > 0 && (
            <div>
              <div className="flex flex-row gap-2 relative items-center">
                <span className="font-bold">Trail: </span>
                <Trail />
                <ShareButton />
              </div>
              <FeedbackButton />
            </div>
          )}
        </div>

        <div className="flex flex-col h-full">
          <h1
            className="font-bold text-3xl pb-3 font-georgia text-blue"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <div>
            <MediaTypeSelector />
          </div>
          <div className="flex-1 flex p-2">
            <GraphRenderer />
            <div className="flex flex-col max-w-[20rem]">
              <NodeInfo />
              <About />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
