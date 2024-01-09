import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetail,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
} from "../../Features/movies/movieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faFilm, faCalendarAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import "./MovieDetail.scss";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(getSelectedMovieOrShow);
  console.log(data);
  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  const handleGoBack = () => {
    // Navigate back to the homepage
    navigate("/");
  };


  return (
    
    <div className="movie-section">
     
      {Object.keys(data).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
           
            <div className="back-button-container">
              <button className="back-button" onClick={handleGoBack}>
                Go Back
              </button>
            </div>

           
          <div className="section-left">
            <div className="movie-title">{data.Title}</div>
            <div className="movie-rating">
              <span>
                  IMDB Rating <FontAwesomeIcon icon={faStar} color="gold" size="1x" /> : {data.imdbRating}
              </span>
              <span>
                  IMDB Votes <FontAwesomeIcon icon={faThumbsUp} color="blue" size="1x" />:{" "}
                {data.imdbVotes}
              </span>
              <span>
                  Runtime  <FontAwesomeIcon icon={faFilm} color="green" size="1x" /> : {data.Runtime}
              </span>
              <span>
                  Year <FontAwesomeIcon icon={faCalendarAlt} color="red" size="1x" /> : {data.Year}
              </span>
            </div>
            <div className="movie-plot">{data.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Genres</span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img src={data.Poster} alt={data.Title} />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;