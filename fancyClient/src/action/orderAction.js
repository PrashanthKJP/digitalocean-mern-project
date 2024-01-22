import axios from "axios";
import swal from "sweetalert";
import { BASE_URL } from "../service/helper";

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: "GET_ORDERS_REQUEST" });
  try {
    const res = await axios.get(`${BASE_URL}/api/getAllOrders`);
    dispatch({
      type: "GET_ORDERS_SUCCESS",
      payload: res.data.reverse(),
    });
  } catch (error) {
    dispatch({ type: "GET_ORDERS_FAIL", payload: error });
  }
};

export const addOrder = (data) => async (dispatch) => {
  dispatch({ type: "ADD_ORDER_REQUEST" });
  try {
    const res = await axios.post(`${BASE_URL}/api/createOrder`, data);
    dispatch({ type: "ADD_ORDER_SUCCESS", payload: res.data });
    swal("Order Added Succss!");
  } catch (error) {
    dispatch({ type: "ADD_ORDER_FAIL", payload: error });
    swal("Errro While Added Order");
  }
};

export const deleteOrder = (OrderId) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/api/deleteSingleOrder/${OrderId}`);
    // swal("Order Deleted Succss!");
  } catch (error) {
    swal("Errro While Deleteing Order");
  }
};
