import React, { createContext, useState } from "react";
    export const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  const [findMovie, setFindMovie] = useState({
    loading: false,
    apiData: [],
  });
  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchContext.Provider value={{ findMovie, setFindMovie, searchInput, setSearchInput }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
