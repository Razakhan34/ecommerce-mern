import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
  loading: false,
  error: null,
  allOrders: [],
  allOrdersAmount: 0,
  orderUpdateStatus: false,
  orderDeleteStatus: false,
};

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: INTIAL_STATE,
  reducers: {
    adminOrderRequest(state) {
      state.loading = true;
    },
    allOrdersSuccess(state, action) {
      state.loading = false;
      state.allOrders = action.payload.orders;
      state.allOrdersAmount = action.payload.totalAmount;
    },
    orderDeleteStatus(state) {
      state.orderDeleteStatus = true;
    },
    orderDeleteReset(state) {
      state.orderDeleteStatus = false;
    },
    orderUpdateStatus(state) {
      state.orderUpdateStatus = true;
    },
    orderUpdateReset(state) {
      state.orderUpdateStatus = false;
    },
    adminOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const adminOrderActions = adminOrderSlice.actions;

export default adminOrderSlice;
