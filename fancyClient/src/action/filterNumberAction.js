import axios from "axios";
import { BASE_URL } from "../service/helper";

export const advanceNumber = (filters) => async (dispatch) => {
  dispatch({ type: "GET_ADVANCE_NUMBER_REQUEST" });
  try {
    const res = await axios.post(`${BASE_URL}/api/advancedSearch?${filters}`);
    dispatch({
      type: "GET_ADVANCE_NUMBER_SUCCESS",
      payload: res.data.reverse(),
    });
  } catch (error) {
    dispatch({ type: "GET_ADVANCE_NUMBER_FAIL", payload: error });
  }
};

export const filterNumber = (filters) => async (dispatch) => {
  dispatch({ type: "GET_FILTER_REQUEST" });
  try {
    const res = await axios.post(`${BASE_URL}/api/filterNumbers?${filters}`);
    dispatch({
      type: "GET_FILTER_SUCCESS",
      payload: res.data.reverse(),
    });
  } catch (error) {
    dispatch({ type: "GET_FILTER_FAIL", payload: error });
  }
};
