import React from "react";

import Grid from "../grid/Grid";
import Paginate from "../paginate/Paginate";
import SlideShow from "../slide-show/SlideShow";
import "./MainContent.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../../redux/actions/movies-action";

const MOVIE_TYPE = {
  now_playing: "Now Playing",
  popular: "Popular",
  top_rated: "Top Rated",
  upcoming: "Upcoming"
};

const MainContent = () => {
  const movieCategory = useSelector((state) => state.movies.movieCategory);
  const totalPages = useSelector((state) => state.movies.totalPages);
  const page = useSelector((state) => state.movies.page);

  const dispatch = useDispatch();

  const paginate = (type) => {
    let pageNumber = page;
    if (type === "prev" && page >= 1) {
      pageNumber -= 1;
    } else {
      pageNumber += 1;
    }
    dispatch(getMovies(movieCategory, pageNumber));
  };
  return (
    <div className="main-content">
      <SlideShow
        auto={true}
        showArrows={true}
      />
      <div className="grid-movie-title">
        <div className="movie-type">{MOVIE_TYPE[movieCategory]}</div>
        <div className="paginate">
          <Paginate
            currentPage={page}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      </div>
      <Grid />
    </div>
  );
};

export default MainContent;
