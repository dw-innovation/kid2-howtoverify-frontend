import useAppContext from "@/lib/hooks/useAppContext";
import { filterIndex, handleSearch } from "@/lib/lib";
import React, { useEffect, useState } from "react";
import Downshift from "downshift";
import clsx from "clsx";

const AutoCompleteResults = () => {
  const [items, setItems] = useState([]);

  const {
    appState: {
      search: { index, category, queryString },
    },
    setAppState,
  } = useAppContext();

  useEffect(() => {
    setItems(filterIndex(index, category));
    if (category !== "default" && queryString !== "") {
      handleSearch(queryString, category, setAppState);
    }
  }, [index, category]);

  return (
    <>
      <Downshift
        onChange={({ value: queryString }) => {
          setAppState((prev) => ({
            ...prev,
            search: { ...prev.search, queryString: queryString },
          }));
          handleSearch(queryString, category, setAppState);
        }}
        itemToString={(item) => (item ? item.value : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div className="flex-1 relative">
            <input
              {...getInputProps({
                onChange: () =>
                  setAppState((prev) => ({
                    ...prev,
                    search: { ...prev.search, showResults: false },
                  })),
              })}
              placeholder="Search"
              className={clsx(
                "h-full w-full relative p-3 bg-white rounded-r-md",
                items.filter(
                  (item) => !inputValue || item.value.includes(inputValue)
                ).length === 0 && "text-red"
              )}
              disabled={category === "default"}
            />
            {isOpen &&
              items.filter(
                (item) => !inputValue || item.value.includes(inputValue)
              ).length > 0 && (
                <ul
                  {...getMenuProps()}
                  className="absolute mt-2 ml-0 p-2 shadow-xl bg-white max-h-44 overflow-scroll w-full"
                >
                  {items
                    .filter(
                      (item) => !inputValue || item.value.includes(inputValue)
                    )
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            fontWeight:
                              selectedItem === item ? "bold" : "normal",
                          },
                        })}
                        className={clsx(
                          "list-none cursor-pointer -mx-2 px-2 py-1",
                          highlightedIndex === index
                            ? "bg-blue hover:text-white"
                            : "bg-white hover:text-blue"
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
