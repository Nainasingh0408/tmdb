import React, { useCallback, useContext, useEffect } from "react";
import "../componentscss/SearchCard.css";
import { SearchContext } from "../commons/SearchProvider";
import { debounce } from "./debounce";

const SearchCard = () => {
  const { setFindMovie, searchInput, setSearchInput } = useContext(SearchContext);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzQ2MzQwNWY1ZDlkNWZmZTRlZDYwZmNiYzk0MGYyYSIsIm5iZiI6MTczMTkxMzk4NC4wMTE2MTQzLCJzdWIiOiI2NzM1ZDA5M2IwNDI5N2Y3MGM2ODJkYTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xJuxhU4_MnZJKavf82AYIUL_XD045ULQZEVD9JTKUcI",
    },
  };

  const searchMovies = (term) => {

    fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "This is the Searched Movie");
        setFindMovie({ apiData: res.results , loading: false });
      })
      .catch((err) => {
        console.error(err);
        setFindMovie({ apiData: [], loading: false });
      });
  };

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const debouncedSearch2 = useCallback(
    debounce((term) => {
      if (term != null) {
        searchMovies(term);
      }
    }, 300),
     []
  );

  useEffect(() => {
    debouncedSearch2(searchInput);
  }, [searchInput, debouncedSearch2]);

  return (
    <section className='searchCard'>
      <section className='wrap'>
        <p className='welcome'>Welcome.</p>
        <p className='descriptionOfSearch'>
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>
        <div className='search-box'>
          <input
            className='search-input'
            type='search'
            name='search-form'
            value={searchInput}
            onChange={handleInput}
            id='search-form'
            placeholder='Search for a movie, TV show, or person...'
          />
          <div className='search_btn_container'>
            <button className='searchbutton' 
            onClick={() => searchMovies(searchInput)}
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SearchCard;
