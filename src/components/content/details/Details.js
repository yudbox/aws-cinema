import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { clearMovieDetails, getMovieDetails } from "../../../redux/actions/movies-action";
import Raiting from "../raiting/Raiting";
import Crew from "./crew/Crew";
import Media from "./media/Media";
import Overview from "./overview/Overview";
import Reviews from "./reviews/Reviews";
import Tabs from "./tabs/Tabs";
import * as constants from "../../../constants";
import "./Details.scss";
import { IMAGE_URL } from "../../../services/movies.service";
import Spinner from "../../spinner/Spinner";

const Details = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const spinnerStatus = useSelector((state) => state.spinnerStatus.isFetching);

  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const backdropPath = movieDetails[constants.MOVIE_DETAIL_TABS.details]?.backdrop_path ? `${IMAGE_URL}${movieDetails[constants.MOVIE_DETAIL_TABS.details].backdrop_path}` : "";
  const posterPath = movieDetails[constants.MOVIE_DETAIL_TABS.details]?.poster_path ? movieDetails[constants.MOVIE_DETAIL_TABS.details].poster_path : "";
  const genres = movieDetails[constants.MOVIE_DETAIL_TABS.details]?.genres;

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
    return () => {
      dispatch(clearMovieDetails());
    };
  }, [movieId]);
  // if (!movieDetails.length) return null;

  return (
    <>
      {spinnerStatus ? (
        <Spinner />
      ) : (
        movieDetails.length && (
          <div className="movie-container">
            <div
              className="movie-bg"
              style={{ backgroundImage: `url(${backdropPath})` }}
            >
              <div className="movie-overlay"></div>
              <div className="movie-details">
                <div className="movie-image">
                  <img
                    src={`${IMAGE_URL}${posterPath}`}
                    alt={movieDetails[constants.MOVIE_DETAIL_TABS.details]?.original_title}
                  />
                </div>
                <div className="movie-body">
                  <div className="movie-overview">
                    <div className="title">
                      {movieDetails[constants.MOVIE_DETAIL_TABS.details]?.original_title} <span>{movieDetails[constants.MOVIE_DETAIL_TABS.details]?.release_date}</span>
                    </div>
                    <div className="movie-genres">
                      <ul className="genres">
                        {Array.isArray(genres) &&
                          genres.length &&
                          genres.map((genre, index) => {
                            return <li key={genre.id ? genre.id : index}>{genre.name}</li>;
                          })}
                      </ul>
                    </div>
                    <div className="rating">
                      <Raiting
                        raiting={movieDetails[constants.MOVIE_DETAIL_TABS.details]?.vote_average}
                        totalStars={10}
                      />
                      &nbsp;
                      <span>{movieDetails[constants.MOVIE_DETAIL_TABS.details]?.vote_average}</span>
                      <p>( {movieDetails[constants.MOVIE_DETAIL_TABS.details]?.vote_count} ) reviews</p>
                    </div>
                    <Tabs>
                      <div label="Overview">
                        <Overview />
                      </div>
                      <div label="Crew">
                        <Crew />
                      </div>
                      <div label="Media">
                        <Media />
                      </div>
                      <div label="Reviews">
                        <Reviews />
                      </div>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Details;
