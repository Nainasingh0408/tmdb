import React,{useState} from "react";
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
import Faulty from "./components/Faulty";
import Fav from "./components/Fav"
import "./App.css";

function App() {  
  const [searchInput, setSearchInput] = useState(null);
  const [findMovies, setFindMovies] = useState({ apiData: null, loading: true });

  return (
    <Router>
      <Header />
      <div className='container'>
        <SearchProvider
          value={{
            searchInput,
            setSearchInput,
            findMovies,
            setFindMovies,
          }}>
          <SearchCard />
          <Routes>
            <Route
              path='/'
              element={
                findMovies && !findMovies?.apiData ? (
                  <>
                    <AppLayout />
                    <Trending />                    
                    <Leaderboard />
                  </>
                ) : (
                  <>
                    <SearchCardResult />
                    <AppLayout />
                    <Trending />
                    <Leaderboard />
                  </>
                )
              }
            />
            <Route path='/favorites' element={<Fav />} />
            <Route path='/Faulty' element={<Faulty />} />
          </Routes>
        </SearchProvider>
      </div>
      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
