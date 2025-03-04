import React, { useEffect, useState } from "react";
import Progress from "./Progress";
import Add from "./Add";

const RestaurantCard = ({ apiData = {}, favorites = [], setFavorites }) => {
  console.log({favorites})
  const { poster_path, title, vote_average, release_date, id } = apiData;
  console.log({id})
  const [isAdded, setIsAdded] = useState(favorites.some((movie) => movie.id === id)); //Auto-check if it's a favorite
console.log({isAdded})
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500";

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
          const newMovie = await response.json();
          setFavorites((prev) => [...prev, newMovie]);
          setIsAdded(true); // Update state
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
  const handleClickRemove = async () => {
    if (!setFavorites) {
      console.error("setFavorites is not provided to RestaurantCard.");
      return;
    }
  
    // Immediately remove the movie from the UI
    setFavorites((prev) => prev.filter((movie) => movie.id !== id));
    setIsAdded(false); // Update state
  
    try {
      const response = await fetch(`http://localhost:3000/favorites/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        console.warn("Failed to remove movie from backend. It might still exist in the database.");
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
        <Add movieId={id} isAdded={isAdded} onAdd={handleClickAdd} onRemove={handleClickRemove} />
      </div>
    </div>
  );
};

export default RestaurantCard;
