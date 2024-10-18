import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
  loading: false,
  error: null,
  order: {},
  myOrders: [],
  orderDetail: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState: INTIAL_STATE,
  reducers: {
    orderRequest(state) {
      state.loading = true;
    },
    createOrderSuccess(state, action) {
      state.loading = false;
      state.order = action.payload;
    },
    myOrderSuccess(state, action) {
      state.loading = false;
      state.myOrders = action.payload;
    },
    orderDetailSuccess(state, action) {
      state.loading = false;
      state.orderDetail = action.payload;
    },
    orderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
