import useAppContext from "@/lib/hooks/useAppContext";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import SearchBox from "../searchBox";
import SearchResults from "../searchResults";
import MediaTypeSelector from "../mediaTypeSelector";

const Header = () => {
  const {
    appState: {
      graph: { pathNodes },
    },
  } = useAppContext();
  
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col lg:flex-row items-center py-4 px-2 lg:pl-8 relative">
      <div className="lg:text-left flex flex-col items-center lg:items-start mb-2 lg:mb-0">
        <h1
          className="font-bold text-3xl 2xl:text-4xl pb-3 font-georgia text-blue"
          dangerouslySetInnerHTML={{ __html: t("title") }}
        />
        <h2
          className="font-noto 2xl:text-lg pb-3"
          dangerouslySetInnerHTML={{ __html: t("subtitle") }}
        />
        <div className="relative w-96">
          <SearchBox />
          <SearchResults />
        </div>
      </div>
      {pathNodes.length !== 0 ? (
        <MediaTypeSelector />
      ) : (
        <div className="h-[5rem] lg:h-[8rem] m-2" />
      )}
    </div>
  );
};

export default Header;
