import React, { useContext, useEffect, useState } from "react";
import "../componentscss/Faulty.css";
import { SearchContext } from "../commons/SearchProvider"; 
import RestaurantCard from "./RestaurantCard";

const Faulty = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState({ apiData: null, loading: true });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { searchInput, findMovie } = useContext(SearchContext);  

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzQ2MzQwNWY1ZDlkNWZmZTRlZDYwZmNiYzk0MGYyYSIsIm5iZiI6MTczMTU4MDQyOC40MDUzNTM1LCJzdWIiOiI2NzM1ZDA5M2IwNDI5N2Y3MGM2ODJkYTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-xSzVIuK1vNZawW5FHVGgvGIrDlgWScs7jcFbRNfHfM",
    },
  };

  const fetchTrendingMovies = () => {
    fetch(`https://api.themoviedb.org/3/trending/all/${selectedIndex === 0 ? "day" : "week"}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        setTrendingMovies({ apiData: res, loading: false });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, [selectedIndex, findMovie?.apiData]); 

  const handleDropdownChange = (event) => {
    const movieId = event.target.value;
    if (movieId === "all") {
      setSelectedMovie(null);
    } else {
      const movie = trendingMovies?.apiData?.results?.find((m) => m.id === Number(movieId));
      setSelectedMovie(movie || null);
    }
  };

  return (
    <div className="outerwrapper">
      <div className="dropdown-container">
        <label className="movie-select-head">Select a Movie: </label>
        <select id="movie-select" onChange={handleDropdownChange} defaultValue="all">
          <option value="all">-- Show All Movies --</option>
          {!trendingMovies.loading &&
            trendingMovies?.apiData?.results?.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title || movie.name}
              </option>
            ))}
        </select>
      </div>
      <div className='movie_card_wrapper'>
          {!trendingMovies.loading &&
            (selectedMovie ? (

              <RestaurantCard apiData={selectedMovie} path='https://media.themoviedb.org/t/p/w220_and_h330_face' />
            ) : (

              trendingMovies?.apiData?.results?.map((movie) => (
                <RestaurantCard key={movie.id} apiData={movie} path='https://media.themoviedb.org/t/p/w220_and_h330_face' />
              ))
            ))}
        </div>

    </div>
  );
};

export default Faulty;
