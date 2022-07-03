import { combineReducers } from "redux";
import errorReducer from "./error-reducer";
import movieReducer from "./movie-reducer";
import spinnerReducer from "./spinner-reducer";

const rootReducers = combineReducers({
  errors: errorReducer,
  movies: movieReducer,
  spinnerStatus: spinnerReducer
});

export default rootReducers;
