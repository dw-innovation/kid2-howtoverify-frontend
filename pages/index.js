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
import useTranslation from "next-translate/useTranslation";

const IndexPage = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();

  const { t } = useTranslation("common");

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
        {t("toggleDevPanel")}
      </Button>
      <div className="absolute bottom-0 left-0">
        <ShareButton />
        <FeedbackButton />
      </div>
      <div className="w-screen h-screen relative">
        <div className="flex flex-col h-full">
          <h1 className="font-bold text-3xl pb-3">{t("title")}</h1>
          <div>
            <MediaTypeSelector />
          </div>
          <div className="flex-1 flex">
            <GraphRenderer />
          <DevPanel />
          </div>
        </div>
      </div>
      <div className="w-max-screen h-max-screen relative"></div>
    </>
  );
};

export default IndexPage;
