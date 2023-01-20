import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import React, { Fragment, useRef } from "react";
import PlusIcon from "src/assets/svg/plusIcon";
import ResultItem from "./resultItem";
import useOnClickOutside from "@/lib/hooks/useOutsideClick";
import useEscapeKey from "@/lib/hooks/useEscapeKey";
import useSessionStore from "@/lib/stores/useSessionStore";

const SearchResults = () => {
  const ref = useRef(null);
  const queryString = useSessionStore((state) => state.search.queryString);
  const results = useSessionStore((state) => state.search.results);
  const showResults = useSessionStore((state) => state.search.showResults);
  const isLoading = useSessionStore((state) => state.search.isLoading);
  const toggleShowResults = useSessionStore((state) => state.toggleShowResults);

  const { t } = useTranslation("common");

  useOnClickOutside(ref, () => toggleShowResults(false));

  useEscapeKey(() => toggleShowResults(false));

  return (
    <>
      {showResults && queryString !== "" && (
        <div
          className="absolute z-[100] mt-1 w-full rounded-b-md bg-white p-2 shadow-xl"
          ref={ref}
        >
          <button
            onClick={() => toggleShowResults(false)}
            className="absolute right-0 top-0 z-30 aspect--1-1 rotate-45 p-2 text-white"
          >
            <PlusIcon />
          </button>

          <div className="-mx-2 -mt-2 bg-blue-primary p-2 pb-2 pr-6 text-white">
            <Trans
              i18nKey="common:searchResultsTitle"
              components={{
                b: <b />,
              }}
              values={{
                queryString: queryString,
              }}
            />
          </div>
          <div className="max-h-[50vh] overflow-x-hidden overflow-y-scroll pt-2">
            {isLoading ? (
              <div className="flex items-center gap-4">
                <span>Loading</span>
                <span className="loader block" />
              </div>
            ) : (
              <>
                {results.map(({ results, category }, index) => (
                  <Fragment key={index}>
                    {results.length > 0 && (
                      <div className="pb-2">
                        <span className="-mb-1 block font-sans text-sm font-bold uppercase">
                          {category.name}
                        </span>
                        <div className="pl-3 pr-2">
                          {results.map((result, index) => (
                            <Fragment key={index}>
                              <ResultItem item={result} />
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
                {results.length === 0 && t("noResults")}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;
