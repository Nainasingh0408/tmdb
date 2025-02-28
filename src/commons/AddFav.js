import { useEffect,useState } from "react";

const AddFav = async (apiData = [], path) => {
  fetch("http://localhost:3000/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apiData, path, liked: true }),
  })
    .then((response) => response.json())
    .then((responseData) => console.log(responseData, "This is the movies that are favourite !!"));
};
export default AddFav;