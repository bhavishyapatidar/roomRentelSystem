import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Discover Your Perfect Home with Us</h1>
          <p>
            At our platform, we believe that finding a home should be a seamless and enjoyable journey. Whether you are looking for a cozy apartment, a spacious family house, or a lucrative investment property, we are here to guide you every step of the way.
          </p>
          
          {/* Rendering the SearchBar component */}
          <SearchBar />
          
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Expertise</h2>
            </div>
            <div className="box">
              <h1>200+</h1>
              <h2>Awards and Recognitions</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Properties Available</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image container */}
      <div className="imgContainer">
        <img src="/bg.png" alt="Background Image" />
      </div>

      {/* Display current user information if available */}
      {currentUser ? (
        <div className="userInfo">
          <h3>Welcome back, {currentUser.name}!</h3>
        </div>
      ) : (
        <div className="userInfo">
          <h3>Welcome, Guest!</h3>
        </div>
      )}
    </div>
  );
}

export default HomePage;
