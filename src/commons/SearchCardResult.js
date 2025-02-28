import React, { useContext } from "react";
import { SearchContext } from "./SearchProvider";
import RestaurantCard from "../components/RestaurantCard";
import "./SearchCardResult.css";

const SearchCardResult = () => {
  const { searchInput, findMovies = { loading: false, apiData: [] } } = useContext(SearchContext);
  
  if (findMovies?.loading) {
    return <p>Loading search results...</p>;
  }

  return (
    <>
      <h2 style={{ marginLeft: "2rem", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }}>Results</h2>

      {findMovies.apiData && findMovies.apiData.length > 0 ? (
        <div className='movieGrid'>
          {findMovies.apiData.map((el, index) => (
            <RestaurantCard key={index} apiData={el} path='https://media.themoviedb.org/t/p/w220_and_h330_face' />
          ))}
        </div>
      ) : (
        <div className='no-results-container'>
          <div className='oops-text'>Oops!</div>
          <p className='message-text'>
            No results found ! Try searching for something else!
          </p>
        </div>
      )}
    </>
  );
};

export default SearchCardResult;
