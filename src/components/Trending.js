import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

const Trending = () => {
  const [popularMovies, setPopularMovies] = useState({ data: null, loading: true });
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzQ2MzQwNWY1ZDlkNWZmZTRlZDYwZmNiYzk0MGYyYSIsIm5iZiI6MTczMTU4MDQyOC40MDUzNTM1LCJzdWIiOiI2NzM1ZDA5M2IwNDI5N2Y3MGM2ODJkYTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-xSzVIuK1vNZawW5FHVGgvGIrDlgWScs7jcFbRNfHfM",
    },
  };

  const fetchPopularMovies = () => {
    fetch("https://api.themoviedb.org/3/movie/popular", options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "res");
        setPopularMovies({ data: res, loading: false });
      })
      .catch((err) => console.error(err));
  };

  console.log(popularMovies, "this is the popular movie data");

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <>
      <h2 className='Trending-Word'>What's Popular</h2>
        <div className='res-container'>
        {!popularMovies.loading &&
          popularMovies?.data?.results?.map((el, i) => {
            return <RestaurantCard apiData={el} path='https://media.themoviedb.org/t/p/w220_and_h330_face' />;
          })}
      </div>
    </>
  );
};

export default Trending;
