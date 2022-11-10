import { useEffect } from "react";
import { useRouter } from "next/router";
import { addPrefix, fetchGraphData, trackAction, triggerTracking } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";
import GraphRenderer from "@/components/graphRenderer";
import MediaTypeSelector from "@/components/mediaTypeSelector";
import ShareButton from "@/components/shareButton";
import FeedbackButton from "@/components/feedbackButton";
import useTranslation from "next-translate/useTranslation";
import useLocation from "@/lib/hooks/useLocation";
import Trail from "@/components/trail";
import Panel from "@/components/panel";

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
      }));
      trackAction("graphClick");
    }
  }, [pathNodes]);

  return (
    <>
      <div className="w-screen h-screen relative bg-lightGrey">
        <div className="absolute bottom-0 left-0 z-10 w-full p-2">
          {pathNodes.length > 0 && (
            <div className="flex flex-row gap-2 relative items-center">
              <span className="font-bold">Trail: </span>
              <Trail />
              <ShareButton />
              <FeedbackButton />
            </div>
          )}
        </div>

        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col xl:flex-row items-center p-2">
              <h1
                className="font-bold text-3xl pb-3 font-georgia text-blue"
                dangerouslySetInnerHTML={{ __html: t("title") }}
              />
              {pathNodes.length !== 0 ? (
                <MediaTypeSelector />
              ) : (
                <div className="h-[5rem] m-2" />
              )}
            </div>
            {pathNodes.length !== 0 ? <GraphRenderer /> : <MediaTypeSelector />}
          </div>
          <Panel />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
