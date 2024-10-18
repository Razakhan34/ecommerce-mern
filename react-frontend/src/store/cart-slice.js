import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.findIndex(
        (currItem) => currItem.product === item.product
      );
      if (isItemExist !== -1) {
        state.cartItems[isItemExist] = item;
        // isItemExist.quantity += item.quantity;
        // isItemExist.totalPrice += item.price * item.quantity;
      } else {
        state.cartItems.push(item);
      }
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      if (state.cartItems.length === 0) {
        state.cartItems = [];
        return;
      }
      const newItems = state.cartItems.filter(
        (currItem) => currItem.product !== itemId
      );
      state.cartItems = newItems;
    },
    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
