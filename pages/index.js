import { useEffect } from "react";
import { useRouter } from "next/router";
import { addPrefix, fetchGraphData, generateURL } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";
import GraphRenderer from "@/components/graphRenderer";
import MediaTypeSelector from "@/components/mediaTypeSelector";
import useLocation from "@/lib/hooks/useLocation";
import Panel from "@/components/panel";
import MobileScreen from "@/components/mobileScreen";
import Navigation from "@/components/navigation";
import Modal from "@/components/modal";
import Footer from "@/components/footer";
import FeedbackButton from "@/components/feedbackButton";
import Header from "@/components/header";

const IndexPage = () => {
  const {
    setAppState,
    appState: {
      graph: { pathNodes },
      modal: { isOpen },
    },
  } = useAppContext();

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
    }

    typeof window !== "undefined" &&
      window.history.pushState(
        {},
        generateURL(pathNodes),
        generateURL(pathNodes)
      );
  }, [pathNodes]);

  return (
    <>
      <div
        className="w-screen h-screen relative bg-lightGrey hidden md:flex flex-col overflow-hidden"
        style={{ filter: isOpen ? "blur(4px)" : "" }}
      >
        <FeedbackButton />
        <div className="flex flex-row flex-1">
          <div className="flex flex-col flex-1">
            <Header />
            {pathNodes.length !== 0 ? <GraphRenderer /> : <MediaTypeSelector />}
            <div className="w-full relative pl-2 lg:pl-8 p-2 bg-lightGrey">
              <Navigation />
            </div>
          </div>
          <Panel />
        </div>
        <Footer />
      </div>
      <Modal />
      <MobileScreen />
    </>
  );
};

export default IndexPage;
