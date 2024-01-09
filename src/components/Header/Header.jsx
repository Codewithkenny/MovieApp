import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../Features/movies/movieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  

  const submitHandler = (e) => {
    e.preventDefault();

    if (term === "") return alert("Please enter a term!");

    // Dispatch actions to fetch movies and shows
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));

    // Clear the search term
    setTerm("");
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movixer</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies Or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="user-icon">
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
};

export default Header;
