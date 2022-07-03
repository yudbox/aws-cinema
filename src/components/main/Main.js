import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Main.scss";
import MainContent from "../content/main-content/MainContent";
import { loadMoreMovies } from "../../redux/actions/movies-action";
// import Spinner from "../spinner/Spinner";

const Main = () => {
  // const spinnerStatus = useSelector((state) => state.spinnerStatus.isFetching);
  const page = useSelector((state) => state.movies.page);
  const totalPages = useSelector((state) => state.movies.totalPages);
  const category = useSelector((state) => state.movies.movieCategory);

  const dispatch = useDispatch();

  const mainRef = useRef();
  const bottomLineRef = useRef();

  const getMoreMovieData = () => {
    let pageNumber = page;
    if (page < totalPages) {
      pageNumber += 1;
      dispatch(loadMoreMovies(category, pageNumber));
    }
  };

  const handleScroll = () => {
    const containerheight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();

    if (bottomLineTop <= containerheight) {
      getMoreMovieData();
    }
  };
  return (
    <div
      className="main"
      ref={mainRef}
      onScroll={() => handleScroll()}
    >
      <MainContent />
      <div ref={bottomLineRef}></div>
    </div>
  );
};

export default Main;
