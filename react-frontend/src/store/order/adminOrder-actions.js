import axios from "axios";
import { adminOrderActions } from "./adminOrder-slice";

// get all orders for admin
export const getAllOrdersForAdmin = () => {
  return async (dispatch) => {
    try {
      dispatch(adminOrderActions.adminOrderRequest());
      const { data } = await axios.get("/api/v1/orders/");
      if (data.status === "success") {
        dispatch(adminOrderActions.allOrdersSuccess(data));
      }
    } catch (error) {
      dispatch(adminOrderActions.adminOrderFail(error.response.data.message));
    }
  };
};

export const deleteOrder = (id) => {
  return async (dispatch) => {
    try {
      dispatch(adminOrderActions.adminOrderRequest());
      const { data } = await axios.delete(`/api/v1/orders/${id}`);
      if (data.status === "success") {
        dispatch(adminOrderActions.orderDeleteStatus());
      }
    } catch (error) {
      dispatch(adminOrderActions.adminOrderFail(error.response.data.message));
    }
  };
};

export const updateOrder = (id, order) => {
  return async (dispatch) => {
    try {
      dispatch(adminOrderActions.adminOrderRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.patch(`/api/v1/orders/${id}`, order, config);
      if (data.status === "success") {
        dispatch(adminOrderActions.orderUpdateStatus());
      }
    } catch (error) {
      dispatch(adminOrderActions.adminOrderFail(error.response.data.message));
    }
  };
};

export const clearErrorOrderForAdmin = () => {
  return (dispatch) => {
    dispatch(adminOrderActions.clearError());
  };
};
