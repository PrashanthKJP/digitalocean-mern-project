import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  addNumberReducer,
  editNumberReducer,
  getAllNumberReducer,
} from "./reducer/numberReducer";
import { getAllOrderReducer, addOrderReducer } from "./reducer/orderReducer";
import {
  registerUser,
  loginUser,
  getAllUsersReducer,
} from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import {
  advanceNumberReducer,
  filterNumberReducer,
} from "./reducer/filterReducer";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const rootReducer = combineReducers({
  cartReducer,
  getAllUsersReducer,
  registerUser,
  getAllOrderReducer,
  advanceNumberReducer,
  getAllNumberReducer,
  loginUser,
  addNumberReducer,
  editNumberReducer,
  addOrderReducer,
  filterNumberReducer,
});

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUser: {
    currentUser: currentUser,
  },
};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
