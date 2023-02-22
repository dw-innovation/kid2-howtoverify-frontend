import React, { useEffect } from "react";
import LensIcon from "src/assets/svg/lens";
import { getIndex, handleSearch } from "@/lib/lib";
import AutoCompleteSearch from "../autoCompleteSearch";
import useSessionStore from "@/lib/stores/useSessionStore";

const SearchBox = () => {
  const queryString = useSessionStore((state) => state.search.queryString);

  useEffect(() => {
    getIndex();
  }, []);

  return (
    <form
      className="flex flex-row font-montserrat"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(queryString);
      }}
      id="featureTour-6"
    >
      <div className="flex items-center justify-center px-4 aspect--1-1 bg-blue-primary">
        <LensIcon />
      </div>
      <div className="flex w-full">
        <AutoCompleteSearch />
      </div>
    </form>
  );
};

export default SearchBox;
