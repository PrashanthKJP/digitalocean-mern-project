export const getAllCommentReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_COMMENTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_COMMENTS_SUCCESS":
      return {
        comments: action.payload,
        loading: false,
      };
    case "GET_COMMENTS_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
