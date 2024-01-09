import React, { useEffect } from "react";
import { fetchAsyncMovies, fetchAsyncShows } from "../../Features/movies/movieSlice";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from "react-redux";
 

const Home = () => {
  const dispatch = useDispatch();
  const movieText = "Mission";
  const showText = "Mother";
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);

  

 
  return (
    <div>
      <div className="banner-img"></div>
        <MovieListing />
    </div>
  );
};

export default Home;
