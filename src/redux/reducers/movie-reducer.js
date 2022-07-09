import { GET_MOVIES_LIST, LOAD_MORE_MOVIES, SET_MOVIE_CATEGORY, SET_SEARCH_QUERY_STRING, SET_SEARCH_RESULTS } from "../types";
import * as constants from "../../constants";

const initialState = {
  list: [],
  page: 1,
  totalPages: 0,
  movieCategory: constants.NOW_PLAYING,
  searchQuery: "",
  searchResult: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_LIST:
      return {
        ...state,
        list: action.payload.list,
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    case LOAD_MORE_MOVIES:
      return {
        ...state,
        list: [...state.list, ...action.payload.list],
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    case SET_MOVIE_CATEGORY:
      return {
        ...state,
        movieCategory: action.payload
      };
    case SET_SEARCH_QUERY_STRING:
      return {
        ...state,
        searchQuery: action.payload
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResult: action.payload.searchResult,
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    default:
      return state;
  }
};
