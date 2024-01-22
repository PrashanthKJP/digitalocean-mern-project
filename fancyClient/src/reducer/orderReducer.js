export const getAllOrderReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ORDERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ORDERS_SUCCESS":
      return {
        orders: action.payload,
        loading: false,
      };
    case "GET_ORDERS_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const addOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_ORDER_SUCCESS":
      return {
        order: action.payload,
        loading: false,
        success: true,
      };
    case "ADD_ORDER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
