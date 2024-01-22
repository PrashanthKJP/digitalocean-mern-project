export const getAllNumberReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_NUMBER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_NUMBER_SUCCESS":
      return {
        numbers: action.payload,
        loading: false,
      };
    case "GET_NUMBER_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const addNumberReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_NUMBER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_NUMBER_SUCCESS":
      return {
        number: action.payload,
        loading: false,
        success: true,
      };
    case "ADD_NUMBER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const editNumberReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_NUMBER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EDIT_NUMBER_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        success: true,
      };
    case "EDIT_NUMBER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
