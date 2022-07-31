import { batch } from "react-redux";
import { MOVIE_API_URL, MOVIE_CREDITS_API_URL, MOVIE_DETAILS_API_URL, MOVIE_IMAGES_API_URL, MOVIE_REVIEWS_API_URL, MOVIE_VIDEOS_API_URL, SEARCH_API_URL } from "../../services/movies.service";
import { CLEAR_MOVIE_DETAILS, GET_MOVIES_LIST, LOAD_MORE_MOVIES, SET_ERROR, SET_MOVIE_CATEGORY, SET_MOVIE_DETAILS, SET_SEARCH_QUERY_STRING, SET_SEARCH_RESULTS } from "../types";
import { changeSpinnerStatus } from "./spinner-action";

export const getSearchResult = (query) => (dispatch) => {
  dispatchMethod(SET_SEARCH_QUERY_STRING, query, dispatch);
};
let timerId;
export const setSearchQuery = (query) => (dispatch) => {
  dispatchMethod(SET_SEARCH_QUERY_STRING, query, dispatch);
  clearTimeout(timerId);

  if (!query) {
    return dispatchMethod(SET_SEARCH_RESULTS, { searchResult: [], page: 1, totalPages: 0 }, dispatch);
  }

  timerId = setTimeout(async () => {
    try {
      changeSpinnerStatus(true, dispatch);
      const searchResult = await SEARCH_API_URL(query);
      const { results, page, total_pages } = searchResult.data;
      batch(() => {
        dispatchMethod(SET_SEARCH_RESULTS, { searchResult: results, page, totalPages: total_pages }, dispatch);
        changeSpinnerStatus(false, dispatch);
      });
    } catch (error) {
      changeSpinnerStatus(false, dispatch);
      if (error.response) {
        dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
      }
    }
  }, 500);
};

export const getMovies = (type, pageNumber) => (dispatch) => {
  getMoviesRequest(type, pageNumber, dispatch, GET_MOVIES_LIST);
};

export const loadMoreMovies = (type, pageNumber) => async (dispatch) => {
  getMoviesRequest(type, pageNumber, dispatch, LOAD_MORE_MOVIES);
};
export const setMovieCategory = (category) => async (dispatch) => {
  dispatchMethod(SET_MOVIE_CATEGORY, category, dispatch);
};

export const getMovieDetails = (movieId) => async (dispatch) => {
  try {
    const details = MOVIE_DETAILS_API_URL(movieId);
    const credits = MOVIE_CREDITS_API_URL(movieId);
    const images = MOVIE_IMAGES_API_URL(movieId);
    const videos = MOVIE_VIDEOS_API_URL(movieId);
    const reviews = MOVIE_REVIEWS_API_URL(movieId);

    const resp = await Promise.all([details, credits, images, videos, reviews]).then((values) => values.map((value) => value.data));

    dispatchMethod(SET_MOVIE_DETAILS, resp, dispatch);
  } catch (error) {
    changeSpinnerStatus(false, dispatch);
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const clearMovieDetails = () => (dispatch) => {
  dispatch({
    type: CLEAR_MOVIE_DETAILS
  });
};

const dispatchMethod = (type, payload = {}, dispatch) => {
  dispatch({
    type,
    payload
  });
};

const getMoviesRequest = async (type, pageNumber, dispatch, actionType) => {
  try {
    changeSpinnerStatus(true, dispatch);
    const movies = await MOVIE_API_URL(type, pageNumber);
    const { results, page, total_pages } = movies.data;
    batch(() => {
      dispatchMethod(actionType, { list: results, page, totalPages: total_pages }, dispatch);
      changeSpinnerStatus(false, dispatch);
    });
  } catch (error) {
    changeSpinnerStatus(false, dispatch);
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};
