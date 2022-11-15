import useAppContext from "@/lib/hooks/useAppContext";
import { removePrefix } from "@/lib/lib";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import React, { Fragment } from "react";
import PlusIcon from "src/assets/svg/plusIcon";
import ResultItem from "./resultItem";
import clsx from "clsx";

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
        <div className="absolute w-full p-2 mt-2 shadow-xl bg-white rounded-b-md">
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
              <div className="border-b-2 border-neutral-200 pb-2 pr-4">
                <Trans
                  i18nKey="common:searchResultsTitle"
                  components={{
                    b: <b />,
                  }}
                  values={{
                    queryString: queryString,
                    category: removePrefix(category),
                  }}
                />
              </div>
              <div className="pt-2">
                {results.map((item, index) => (
                  <div
                    key={index}
                    className={clsx(
                      results.length > index + 1 &&
                        "border-b-[1px] border-neutral-200"
                    )}
                  >
                    <ResultItem item={item} />
                  </div>
                ))}
                {results.length === 0 && t("noResults")}
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
