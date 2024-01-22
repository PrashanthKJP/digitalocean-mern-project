export const advanceNumberReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ADVANCE_NUMBER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ADVANCE_NUMBER_SUCCESS":
      return {
        advanceNumbers: action.payload,
        loading: false,
      };
    case "GET_ADVANCE_NUMBER_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const filterNumberReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_FILTER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_FILTER_SUCCESS":
      return {
        filterNumbers: action.payload,
        loading: false,
      };
    case "GET_FILTER_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
