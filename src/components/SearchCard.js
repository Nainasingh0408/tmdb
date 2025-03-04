import React, { useCallback, useContext, useEffect, useRef } from "react";
import "../componentscss/SearchCard.css";
import { SearchContext } from "../commons/SearchProvider";
import { debounce } from "./debounce";

const SearchCard = ({ onSearchTrigger }) => {  // Receive trigger
  const { findMovies, setFindMovies, searchInput, setSearchInput } = useContext(SearchContext);
  const searchInputRef = useRef(null);  // Create ref for search input

  useEffect(() => {
    if (onSearchTrigger) {
      searchInputRef.current?.focus();  //  Focus when triggered
    }
  }, [onSearchTrigger]);  // Watch trigger changes

  const searchMovies = (term) => {
    if (!term.trim()) return;

    setFindMovies({ apiData: [], loading: true });
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(term)}&include_adult=false&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzQ2MzQwNWY1ZDlkNWZmZTRlZDYwZmNiYzk0MGYyYSIsIm5iZiI6MTczMTkxMzk4NC4wMTE2MTQzLCJzdWIiOiI2NzM1ZDA5M2IwNDI5N2Y3MGM2ODJkYTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xJuxhU4_MnZJKavf82AYIUL_XD045ULQZEVD9JTKUcI",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setFindMovies({ apiData: res.results || [], loading: false });
      })
      .catch((err) => {
        console.error(err);
        setFindMovies({ apiData: [], loading: false });
      });
  };

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term.trim()) {
        searchMovies(term);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (searchInput.trim() !== "") {
      debouncedSearch(searchInput);
    }
  }, [searchInput]);

  return (
    <section className='searchCard'>
      <section className='wrap'>
        <p className='welcome'>Welcome.</p>
        <p className='descriptionOfSearch'>
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>
        <div className='search-box'>
          <input
            ref={searchInputRef}  // Attach ref to input
            className='search-input'
            type='search'
            value={searchInput}
            onChange={handleInput}
            placeholder='Search for a movie, TV show, or person...'
          />
          <div className='search_btn_container'>
            <button className='searchbutton' onClick={() => searchMovies(searchInput)}>
              Search
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SearchCard;
