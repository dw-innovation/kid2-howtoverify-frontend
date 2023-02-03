import { useEffect } from "react";
import { useRouter } from "next/router";
import { addPrefix, fetchGraphData, generateURL } from "@/lib/lib";
import useAppContext from "@/lib/hooks/useAppContext";
import useLocation from "@/lib/hooks/useLocation";
import Panel from "@/components/panel";
import MobileScreen from "@/components/mobileScreen";
import Modal from "@/components/modal";
import Footer from "@/components/footer";
import FeedbackButton from "@/components/feedbackButton";
import Header from "@/components/header";
import useSessionStore from "@/lib/stores/useSessionStore";
import ContentWrapper from "@/components/contentWrapper";
import GraphCanvas from "@/components/graphCanvas/graphCanvas";
import FeatureTour from "@/components/featureTour";
import CookieBanner from "@/components/cookieBanner";

const IndexPage = () => {
  const pathNodes = useSessionStore((state) => state.pathNodes);
  const { setAppState } = useAppContext();

  const replacePathNodes = useSessionStore((state) => state.replacePathNodes);

  const { query } = useRouter();

  const location = typeof window !== "undefined" ? useLocation() : "";

  useEffect(() => {
    const pathArray = location.substring(1).split("/");

    if (pathArray[0] !== "") {
      const pathNodes = pathArray.map((item) => addPrefix(item));
      replacePathNodes(pathNodes);
    }
  }, [location]);

  useEffect(() => {
    if (typeof query.path !== "undefined" && query?.path.length > 0) {
      const queryPath = query.path.map((item) => addPrefix(item));
      replacePathNodes(queryPath);
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

  const { width } = useWindowSize();

  return (
    <>
      <ContentWrapper>
        <FeedbackButton />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="flex flex-row flex-1">
            <GraphCanvas />
            <Panel />
          </div>
        </div>
        <Footer />
      </ContentWrapper>
      <Modal />
      <MobileScreen />
      {width > 768 && <FeatureTour />}
      <CookieBanner />
    </>
  );
};

export default IndexPage;
