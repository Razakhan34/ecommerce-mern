import axios from "axios";
import { orderActions } from "./order-slice";

export const createOrder = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch(orderActions.orderRequest());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("/api/v1/orders/", orderData, config);
      if (data.status === "success") {
        dispatch(orderActions.createOrderSuccess(data.order));
      }
    } catch (error) {
      dispatch(orderActions.orderFail(error.response.data.message));
    }
  };
};

export const getMyOrders = () => {
  return async (dispatch) => {
    try {
      dispatch(orderActions.orderRequest());
      const { data } = await axios.get("/api/v1/orders/myOrders");
      if (data.status === "success") {
        dispatch(orderActions.myOrderSuccess(data.orders));
      }
    } catch (error) {
      dispatch(orderActions.orderFail(error.response.data.message));
    }
  };
};
export const getOrderDetail = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(orderActions.orderRequest());
      const { data } = await axios.get(`/api/v1/orders/${orderId}`);
      if (data.status === "success") {
        dispatch(orderActions.orderDetailSuccess(data.order));
      }
    } catch (error) {
      dispatch(orderActions.orderFail(error.response.data.message));
    }
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch(orderActions.clearError());
  };
};
