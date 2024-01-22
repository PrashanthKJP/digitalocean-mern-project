import axios from "axios";
import swal from "sweetalert";
import { BASE_URL } from "../service/helper";

export const getAllNumber = () => async (dispatch) => {
  dispatch({ type: "GET_NUMBER_REQUEST" });
  try {
    const res = await axios.get(`${BASE_URL}/api/getAllNumber`);
    dispatch({
      type: "GET_NUMBER_SUCCESS",
      payload: res.data.reverse(),
    });
  } catch (error) {
    dispatch({ type: "GET_NUMBER_FAIL", payload: error });
  }
};

export const addNumber = (data) => async (dispatch) => {
  dispatch({ type: "ADD_NUMBER_REQUEST" });
  try {
    const res = await axios.post(`${BASE_URL}/api/addNumber`, data);
    dispatch({ type: "ADD_NUMBER_SUCCESS", payload: res.data });
    swal("Number Added Succss!");
  } catch (error) {
    dispatch({ type: "ADD_NUMBER_FAIL", payload: error });
    swal("Errro While Added Number");
  }
};

export const deleteNumber = (numberId) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/api/deletSingleNumber/${numberId}`);
    // swal("Number Deleted Succss!");
  } catch (error) {
    swal("Errro While Deleteing Number");
  }
};

export const editNumber = (data, id) => async (dispatch) => {
  dispatch({ type: "EDIT_NUMBER_REQUEST" });
  try {
    const res = await axios.put(
      `${BASE_URL}/api/updateSingleNumber/${id}`,
      data
    );
    dispatch({ type: "EDIT_NUMBER_SUCCESS", payload: res.data });
    swal("Number edited Succss!");
  } catch (error) {
    dispatch({ type: "EDIT_NUMBER_FAIL", payload: error });
    swal("Errro While edited Number");
  }
};
