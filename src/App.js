import React, { useState, useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Trending from "./components/Trending";
import SearchCard from "./components/SearchCard";  
import { SearchProvider } from "./commons/SearchProvider";  
import SearchCardResult from "./commons/SearchCardResult";
import Leaderboard from "./components/Leaderboard";
import Fav from "./components/Fav";
import { SearchContext } from "./commons/SearchProvider";
import "./App.css";

function HomePage({ onSearchTrigger }) {  // 🔹 Receive trigger function
  const { findMovies } = useContext(SearchContext); 

  return (
    <>
      <SearchCard onSearchTrigger={onSearchTrigger} />  {/* 🔹 Pass to SearchCard */}
      {findMovies.apiData.length > 0 ? <SearchCardResult /> : null}
      <AppLayout />
      <Trending />
      <Leaderboard />
    </>
  );
}

function App() {  
  const [searchTrigger, setSearchTrigger] = useState(false);  // 🔹 New state to track trigger

  return (
    <Router>
      <SearchProvider>
        <Header onTriggerSearch={() => setSearchTrigger((prev) => !prev)} />  {/* 🔹 Toggle trigger */}
        <div className='container'>
          <Routes>
            <Route path='/' element={<HomePage onSearchTrigger={searchTrigger} />} />  {/* 🔹 Pass to HomePage */}
            <Route path='/favorites' element={<Fav />} />
          </Routes>
        </div>
        <Footer />
      </SearchProvider>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
