import React, { useState, useEffect } from "react";
import Progress from "./Progress";
import Add from "./Add";

const RestaurantCard = ({ apiData = {} }) => {
  const { poster_path, title, vote_average, release_date, id } = apiData;
  const [posts, setPosts] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500";

  // Fetch favorite movies
  useEffect(() => {
    fetch("http://localhost:3000/favorites")
      .then((response) => response.json())
      .then((apiData) => {
        setPosts(apiData);
        setIsAdded(apiData.some((el) => el.id === id)); // Check if movie exists
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []); // Run only once on mount

  // Function to add a movie
  const handleClickAdd = async () => {
    if (!isAdded) {
      try {
        const response = await fetch("http://localhost:3000/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiData),
        });

        if (response.ok) {
          const newMovie = await response.json(); // Get response data
          setPosts((prevPosts) => [...prevPosts, newMovie]); // Update state 
          setIsAdded(true);
          alert("Movie added successfully!");
        } else {
          alert("Failed to add movie.");
        }
      } catch (error) {
        console.error("Error adding movie:", error);
      }
    } else {
      alert("Movie is already in favorites!");
    }
  };
    

  // Function to remove a movie
  const handleClickRemove = async (movieId) => {
    console.log("Attempting to delete movie with ID:", movieId);
  
    try {
      const response = await fetch(`http://localhost:3000/favorites/${Number(movieId)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log(`Movie ${movieId} deleted successfully`);
        setPosts((prevPosts) => prevPosts.filter((movie) => movie.id !== movieId));
        setIsAdded(false);
        alert("Movie removed successfully!");
      } else {
        console.error(`Failed to delete movie ${movieId}, response:`, await response.json());
        alert("Failed to remove movie.");
      }
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };
  
  return (
    <div className="res-card">
      <div className="res-logo">
        <img src={imageUrl} alt={title || "movie image"} className="restaurant-img" />
      </div>
      <div className="res-details">
        <h2>{title}</h2>
        <h3>{release_date}</h3>
        <Progress className="percent" percentage={Math.round(vote_average * 10)} size={55} />
        <Add movieId={id} isAdded={isAdded} onAdd={handleClickAdd} onRemove={() => handleClickRemove(id)} />
      </div>
    </div>
  );
};

export default RestaurantCard;
