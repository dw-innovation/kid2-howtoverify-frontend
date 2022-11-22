import { useEffect } from "react";
import { useRouter } from "next/router";
import { addPrefix, fetchGraphData, generateURL } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";
import GraphRenderer from "@/components/graphRenderer";
import MediaTypeSelector from "@/components/mediaTypeSelector";
import useTranslation from "next-translate/useTranslation";
import useLocation from "@/lib/hooks/useLocation";
import Panel from "@/components/panel";
import MobileScreen from "@/components/mobileScreen";
import Navigation from "@/components/navigation";
import { ROOTNODES } from "@/lib/const";
import Modal from "@/components/modal";

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
        search: {
          ...prev.search,
          category: ROOTNODES.filter(({ id }) => id === pathNodes[0])
            ? pathNodes[0]
            : "default",
        },
      }));

      // push new URL path to browser history
      typeof window !== "undefined" &&
        window.history.pushState(
          {},
          generateURL(pathNodes),
          generateURL(pathNodes)
        );
    }
  }, [pathNodes]);

  return (
    <>
      <div className="w-screen h-screen relative bg-lightGrey hidden md:block">
        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col lg:flex-row items-center p-2 relative">
              <h1
                className="font-bold text-3xl pb-3 font-georgia text-blue cursor-pointer hover:underline"
                dangerouslySetInnerHTML={{ __html: t("title") }}
                onClick={() =>
                  setAppState((prev) => ({
                    ...prev,
                    graph: { ...prev.graph, pathNodes: [] },
                  }))
                }
              />
              {pathNodes.length !== 0 ? (
                <MediaTypeSelector />
              ) : (
                <div className="h-[5rem] m-2" />
              )}
            </div>
            {pathNodes.length !== 0 ? <GraphRenderer /> : <MediaTypeSelector />}
            <div className="w-full relative bg-white">
              <Navigation />
            </div>
          </div>
          <Panel />
        </div>
      </div>
      <Modal />
      <MobileScreen />
    </>
  );
};

export default IndexPage;
