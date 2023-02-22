import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useRef } from "react";
import SearchBox from "../searchBox";
import SearchResults from "../searchResults";
import MediaTypeSelector from "../mediaTypeSelector";
import useSessionStore from "@/lib/stores/useSessionStore";
import clsx from "clsx";
import useWindowSize from "@/lib/hooks/useWindowSize";

const Header = () => {
  const pathNodes = useSessionStore((state) => state.pathNodes);
  const setHeaderHeight = useSessionStore((state) => state.setHeaderHeight);
  const ref = useRef(null);

  const { width, height } = useWindowSize();

  const { t } = useTranslation("common");

  useEffect(() => {
    if (!ref?.current) return;
    const headerHeight = ref?.current?.clientHeight;
    setHeaderHeight(headerHeight);
  }, [width, height]);

  return (
    <div
      className="relative flex flex-col items-center border-b-[1px] bg-grey-header lg:flex-row"
      ref={ref}
    >
      <div className="flex flex-col items-center justify-center h-full pt-4 pl-0 text-center lg:py-4 lg:items-start lg:pl-8 lg:text-left">
        <div id="featureTour-1">
          <h1
            className="pb-1 text-3xl font-bold lg:pb-3 font-georgia text-grey-darker lg:text-5xl"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <h2
            className="pb-0 lg:pb-3 font-noto text-grey-dark 2xl:text-lg"
            dangerouslySetInnerHTML={{ __html: t("subtitle") }}
          />
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 h-full px-2 py-2 lg:pr-8">
        <div
          className={clsx(
            "flex flex-1 items-center justify-center h-full",
            pathNodes.length === 0 && "hidden lg:flex"
          )}
        >
          <MediaTypeSelector header />
        </div>
        <div className="relative w-72 xl:w-96">
          <SearchBox />
          <SearchResults />
        </div>
      </div>
    </div>
  );
};

export default Header;
