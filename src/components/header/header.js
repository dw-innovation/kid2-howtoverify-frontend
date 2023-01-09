import useTranslation from "next-translate/useTranslation";
import React from "react";
import SearchBox from "../searchBox";
import SearchResults from "../searchResults";
import MediaTypeSelector from "../mediaTypeSelector";
import useSessionStore from "@/lib/stores/useSessionStore";

const Header = () => {
  const pathNodes = useSessionStore((state) => state.pathNodes);

  const { t } = useTranslation("common");

  return (
    <div className="relative flex flex-col items-center border-b-[1px] bg-grey-header lg:flex-row">
      <div className="flex h-full flex-col items-center justify-center py-4 pl-2 lg:items-start lg:pl-8 lg:text-left">
        <div id="featureTour-1">
          <h1
            className="pb-3 font-georgia text-3xl font-bold text-grey-darker lg:text-5xl"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <h2
            className="pb-3 font-noto text-grey-dark 2xl:text-lg"
            dangerouslySetInnerHTML={{ __html: t("subtitle") }}
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center py-2 px-2 lg:pr-8 h-full">
        <div className="flex flex-1 items-center justify-center h-full">
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
