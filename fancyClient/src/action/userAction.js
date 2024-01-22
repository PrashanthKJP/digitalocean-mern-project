import axios from "axios";
import swal from "sweetalert";
import { BASE_URL } from "../service/helper";

export const registerUser = (data) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const res = await axios.post(`${BASE_URL}/api/register`, data);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: res.data });
    if (res.data) {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
    }
    setTimeout(() => {
      window.location.href = `/`;
    }, 2000);
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const res = await axios.post(`${BASE_URL}/api/users/login`, user);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
    localStorage.setItem("currentUser", JSON.stringify(res.data));
    setTimeout(() => {
      window.location.href = `/`;
    }, 2000);
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const res = await axios.get(`${BASE_URL}/api/getallusers`);
    dispatch({ type: "GET_USERS_SUCCESS", payload: res.data.reverse() });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAIL", payload: error });
  }
};

export const deleteUser = (userid) => async (dispatch, getState) => {
  try {
    await axios.post(`${BASE_URL}/api/deleteuser`, { userid });
    // swal("User Deleted Succss!", "success");
  } catch (error) {
    swal("Errro While Deleteing User");
  }
};
