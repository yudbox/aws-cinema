import { combineReducers } from "redux";
import errorReducer from "./error-reducer";
import movieReducer from "./movie-reducer";

const rootReducers = combineReducers({
  errors: errorReducer,
  movies: movieReducer
});

export default rootReducers;
