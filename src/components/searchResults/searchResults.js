import useAppContext from "@/lib/hooks/useAppContext";
import { removePrefix } from "@/lib/lib";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import React, { Fragment } from "react";
import PlusIcon from "src/assets/svg/plusIcon";
import ResultItem from "./resultItem";

const SearchResults = () => {
  const {
    appState: {
      search: { queryString, category, results, showResults, error },
      graph: { pathNodes },
    },
    setAppState,
  } = useAppContext();

  const { t } = useTranslation("common");

  return (
    <>
      {showResults && (
        <div className="absolute w-full p-2 mt-2 shadow-xl bg-white">
          <button
            onClick={() =>
              setAppState((prev) => ({
                ...prev,
                search: { ...prev.search, showResults: false },
              }))
            }
            className="absolute right-0 top-0 aspect-square text-blue p-2 rotate-45"
          >
            <PlusIcon />
          </button>
          {category !== "default" ? (
            <>
              <div className="border-b-2 border-neutral-200 pb-2">
                <Trans
                  i18nKey="common:searchResultsTitle"
                  components={{
                    b: <b className="red" />,
                  }}
                  values={{
                    queryString: queryString,
                    category: removePrefix(category),
                  }}
                  defaultTrans="<component>The number is <b>{{count}}</b></component>"
                />
              </div>
              <div className="pt-2">
                {results.map((item, index) => (
                  <Fragment key={index}>
                    <ResultItem item={item} />
                  </Fragment>
                ))}
              </div>
            </>
          ) : (
            t("selectCategory")
          )}
        </div>
      )}
    </>
  );
};

export default SearchResults;
