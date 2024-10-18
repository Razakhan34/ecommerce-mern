import axios from "axios";
import { adminUserActions } from "./adminUser-slice";

// Get all users from admin
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(adminUserActions.adminUserRequest());
      const { data } = await axios.get("/api/v1/users/");
      if (data.status === "success") {
        dispatch(adminUserActions.allUserSuccess(data.users));
      }
    } catch (error) {
      dispatch(adminUserActions.adminUserFail(error.response.data.message));
    }
  };
};

export const getUserDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch(adminUserActions.adminUserRequest());
      const { data } = await axios.get(`/api/v1/users/${id}`);
      if (data.status === "success") {
        dispatch(adminUserActions.userDetailSuccess(data.user));
      }
    } catch (error) {
      dispatch(adminUserActions.adminUserFail(error.response.data.message));
    }
  };
};

export const updateUser = (id, userData) => {
  return async (dispatch) => {
    try {
      dispatch(adminUserActions.adminUserRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.patch(
        `/api/v1/users/${id}`,
        userData,
        config
      );
      if (data.status === "success") {
        dispatch(adminUserActions.userUpdateStatus());
      }
    } catch (error) {
      dispatch(adminUserActions.adminUserFail(error.response.data.message));
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(adminUserActions.adminUserRequest());

      const { data } = await axios.delete(`/api/v1/users/${id}`);
      if (data.status === "success") {
        dispatch(adminUserActions.userDeleteStatus());
      }
    } catch (error) {
      dispatch(adminUserActions.adminUserFail(error.response.data.message));
    }
  };
};

export const clearErrorUser = () => {
  return (dispatch) => {
    dispatch(adminUserActions.clearError());
  };
};
