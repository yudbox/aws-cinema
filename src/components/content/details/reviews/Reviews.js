import React from "react";
import { useSelector } from "react-redux";

import * as constants from "../../../../constants";
import "./Reviews.scss";

const Reviews = () => {
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const reviews = movieDetails[constants.MOVIE_DETAIL_TABS.reviews]?.results;
  return (
    <>
      <div className="movie-reviews">
        <div className="div-title">Reviews {reviews?.length}</div>
        {Array.isArray(reviews) &&
          reviews.length &&
          reviews.map((review) => (
            <div
              key={review.id}
              className="reviews"
            >
              <h3>{review.author}</h3>
              <div>{review.content}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Reviews;
