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
          className="absolute w-full p-2 mt-1 shadow-xl bg-white rounded-b-md z-[100]"
          ref={ref}
        >
          <button
            onClick={() => toggleShowResults(false)}
            className="absolute right-0 top-0 z-30 aspect-square text-white p-2 rotate-45"
          >
            <PlusIcon />
          </button>

          <div className="pb-2 pr-6 bg-blue text-white -mx-2 -mt-2 p-2">
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
          <div className="pt-2 max-h-[50vh] overflow-y-scroll overflow-x-hidden">
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
                        <span className="font-bold font-sans uppercase text-sm -mb-1 block">
                          {category.name}
                        </span>
                        <div className="pl-3 pr-2">
                          {results.map((result) => (
                            <ResultItem item={result} />
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
