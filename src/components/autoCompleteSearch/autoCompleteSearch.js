import { handleSearch } from "@/lib/lib";
import React, { useEffect, useState } from "react";
import Downshift from "downshift";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import useSessionStore from "@/lib/stores/useSessionStore";
import tailwindConfig from "tailwind.config";

const AutoCompleteResults = () => {
  const [inputString, setInputString] = useState("");

  const toggleShowResults = useSessionStore((state) => state.toggleShowResults);

  const { t } = useTranslation("common");

  const queryString = useSessionStore((state) => state.search.queryString);
  const setSearchQueryString = useSessionStore(
    (state) => state.setSearchQueryString
  );
  const index = useSessionStore((state) => state.search.index);

  useEffect(() => {
    if (queryString !== "") {
      handleSearch(queryString);
    }
  }, [index]);

  useEffect(() => {
    setInputString(queryString);
  }, [queryString]);

  const stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEscape:
        return {
          ...changes,
          ...state,
          isOpen: false,
          inputValue: state.selectedItem.label,
        };
      default:
        return changes;
    }
  };

  return (
    <>
      <Downshift
        onChange={({ value: queryString = "" }) => {
          setSearchQueryString(queryString);
          handleSearch(queryString);
        }}
        itemToString={(item) => (item ? item.value.toLowerCase() : "")}
        onSelect={() => toggleShowResults(true)}
        stateReducer={stateReducer}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          highlightedIndex,
          selectedItem,
          setState,
        }) => (
          <div className="flex-1 relative self-end h-full">
            <input
              {...getInputProps({
                onChange: ({ target: { value } }) => {
                  selectedItem?.name !== value && toggleShowResults(false);
                  setInputString(value);
                },
              })}
              id="featureTour-6"
              onFocus={() => setState({ isOpen: true })}
              placeholder={t("searchStartTyping")}
              value={inputString}
              className={clsx(
                "h-full w-full relative p-3 bg-white h-full",
                index.filter(
                  (item) =>
                    !inputString ||
                    item.name.toLowerCase().includes(inputString.toLowerCase())
                ).length === 0 && "text-red-primary"
              )}
              style={{
                boxShadow: `inset 0 0 0 2px ${tailwindConfig.theme.extend.colors.blue.primary}`,
              }}
            />
            {isOpen &&
              index.filter(
                (item) =>
                  !inputString ||
                  item.name.toLowerCase().includes(inputString.toLowerCase())
              ).length > 0 && (
                <ul
                  {...getMenuProps()}
                  className="absolute mt-1 ml-0 p-2 shadow-xl bg-white max-h-44 z-[100] overflow-scroll w-full"
                >
                  {index
                    .filter(
                      (item) =>
                        !inputString ||
                        item.name
                          .toLowerCase()
                          .includes(inputString.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            fontWeight:
                              inputString === item.value ? "bold" : "normal",
                          },
                          onClick: () => setInputString(item.value),
                        })}
                        className={clsx(
                          "list-none cursor-pointer -mx-2 px-2 py-1",
                          highlightedIndex === index
                            ? "bg-blue-nextClick hover:text-white"
                            : "bg-white hover:text-blue-primary"
                        )}
                      >
                        {item.value}
                      </li>
                    ))}
                </ul>
              )}
          </div>
        )}
      </Downshift>
    </>
  );
};

export default AutoCompleteResults;
