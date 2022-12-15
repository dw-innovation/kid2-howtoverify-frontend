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
    <div className="flex flex-col lg:flex-row items-center relative border-b-[1px] bg-grey-header">
      <div className="py-4 px-2 lg:pl-8 pr-2 lg:pr-8 lg:text-left flex flex-col items-center lg:items-start justify-center h-full">
        <h1
          className="font-bold text-3xl lg:text-5xl pb-3 font-georgia text-grey-darker"
          id="featureTour-1"
          dangerouslySetInnerHTML={{ __html: t("title") }}
        />
        <h2
          className="font-noto 2xl:text-lg pb-3 text-grey-dark"
          dangerouslySetInnerHTML={{ __html: t("subtitle") }}
        />
      </div>
      <div className="py-4 px-2 lg:pr-8 flex flex-1 items-center justify-center">
        <div className="flex flex-1 justify-center items-center">
          {pathNodes.length !== 0 ? (
            <MediaTypeSelector />
          ) : (
            <div className="h-[5rem] lg:h-[8rem] m-2" />
          )}
        </div>
        <div className="relative w-96">
          <SearchBox />
          <SearchResults />
        </div>
      </div>
    </div>
  );
};

export default Header;
