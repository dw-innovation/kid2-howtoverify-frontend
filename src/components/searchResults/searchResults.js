import useAppContext from "@/lib/hooks/useAppContext";
import { removePrefix } from "@/lib/lib";
import useTranslation from "next-translate/useTranslation";
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
              Search Results for{" "}
              <span className="font-bold">"{queryString}"</span> in{" "}
              <span className="font-bold">{removePrefix(category)}</span>
              <div>
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
