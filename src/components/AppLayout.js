import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";

const AppLayout = () => {
  const [listofRes, setListofRes] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzQ2MzQwNWY1ZDlkNWZmZTRlZDYwZmNiYzk0MGYyYSIsIm5iZiI6MTczMTU4MDQyOC40MDUzNTM1LCJzdWIiOiI2NzM1ZDA5M2IwNDI5N2Y3MGM2ODJkYTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-xSzVIuK1vNZawW5FHVGgvGIrDlgWScs7jcFbRNfHfM",
    },
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          options
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        console.log("Trending Movies Data:", json);
        setListofRes(json.results || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return listofRes.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="AppLayout">
      <div className="res-container">
        {listofRes.map((movie) => (
          <RestaurantCard key={movie.id} apiData={movie} />
        ))}
      </div>
    </div>
  );
};

export default AppLayout;
