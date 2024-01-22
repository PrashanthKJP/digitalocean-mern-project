import swal from "sweetalert";

export const addToCart =
  (price, number, oldPrice, _id) => (dispatch, getState) => {
    var cartItem = {
      price: price,
      number: number,
      oldPrice: oldPrice,
      _id: _id,
    };
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
    swal("Item added successfully...");
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };

export const deleteFromCart = (number) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: number });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  swal("Item deleted successfully...");
};
