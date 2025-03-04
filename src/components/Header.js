import { Link } from "react-router-dom";

const Header = ({ onTriggerSearch }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="APP LOGO" />
      </div>
      <div className="menu">
        <ul>
          <li><Link to="/" className="mlink">Movies</Link></li>
          <li><Link to="/favorites" className="tlink">Favourites</Link></li>
          <li>People</li>
          <li>More</li>
        </ul>
      </div>
      <div className="nav-items">
        <ul>
          <li><button className="en">EN</button></li> 
          <li>Login</li>
          <li>Join TMDB</li>
          <li>
            <button onClick={onTriggerSearch} className="search-btn">
              <img 
                className="search-icon" 
                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg" 
                alt="search-btn"
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
