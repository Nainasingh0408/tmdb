import "../componentscss/Fav.css";
import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

const Fav = ({ apiData, path }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    fetch("http://localhost:3000/favorites")
      .then((response) => response.json())
      .then((apiData) => setPosts(apiData))
      .catch((err) => console.log(err));
  }, []);

  console.log(posts, "posts");

  return (
    <>
      <h1 className='fav'>My Favourites</h1>
      <div className='movie_card_wrapper'>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          posts?.map((el, i) => {
            return <RestaurantCard apiData={el} path='https://media.themoviedb.org/t/p/w220_and_h330_face' post={posts} setPosts={setPosts}/>;
          })
        )}
      </div>
    </>
  );
};

export default Fav;
