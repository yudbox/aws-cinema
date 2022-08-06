import { SET_IS_FETCHING } from "../types";

export const changeSpinnerStatus = (payload, dispatch) => {
  dispatch({
    type: SET_IS_FETCHING,
    payload
  });
};
