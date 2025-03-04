import React, { createContext, useState } from "react";
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [findMovies, setFindMovies] = useState({
    loading: false,
    apiData: [],
  });

  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchContext.Provider value={{ findMovies, setFindMovies, searchInput, setSearchInput }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
