import { batch } from "react-redux";
import { MOVIE_API_URL } from "../../services/movies.service";
import { GET_MOVIES_LIST, LOAD_MORE_MOVIES, SET_ERROR, SET_MOVIE_CATEGORY } from "../types";
import { changeSpinnerStatus } from "./spinner-action";

export const getMovies = (type, pageNumber) => (dispatch) => {
  getMoviesRequest(type, pageNumber, dispatch, GET_MOVIES_LIST);
};

export const loadMoreMovies = (type, pageNumber) => async (dispatch) => {
  getMoviesRequest(type, pageNumber, dispatch, LOAD_MORE_MOVIES);
};
export const setMovieCategory = (category) => async (dispatch) => {
  dispatchMethod(SET_MOVIE_CATEGORY, category, dispatch);
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
