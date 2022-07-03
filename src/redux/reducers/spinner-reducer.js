import { SET_IS_FETCHING } from "../types";

const initialState = {
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      };
    default:
      return state;
  }
};
