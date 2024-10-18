import axios from "axios";
import { cartActions } from "./cart-slice";

// add to cart
export const addItemToCart = (productId, quantity) => {
  return async (dispatch, getState) => {
    const {
      data: { product },
    } = await axios.get(`/api/v1/products/${productId}`);

    dispatch(
      cartActions.addItemToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        stock: product.stock,
        quantity,
      })
    );

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

// remove from cart
export const itemRemoveFromCart = (productId) => {
  return (dispatch, getState) => {
    dispatch(cartActions.removeItemFromCart(productId));

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

// save shipping info
export const saveShippingInfo = (data) => {
  return (dispatch) => {
    dispatch(cartActions.saveShippingInfo(data));

    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };
};
