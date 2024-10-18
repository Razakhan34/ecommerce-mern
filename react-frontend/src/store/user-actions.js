import axios from "axios";
import { forgotPasswordActions } from "./forgotPassword-slice";
import { profileActions } from "./profile-slice";
import { userActions } from "./user-slice";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(userActions.loginRequest());
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post(
        "/api/v1/users/login",
        {
          email,
          password,
        },
        config
      );
      if (response.data.status === "success") {
        dispatch(userActions.loginSuccess(response.data.user));
      }
    } catch (error) {
      dispatch(userActions.loginFail(error.response.data.message));
    }
  };
};

export const signup = (userData) => {
  return async (dispatch) => {
    dispatch(userActions.loginRequest());
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.post(
        "/api/v1/users/signup",
        userData,
        config
      );
      if (response.data.status === "success") {
        dispatch(userActions.loginSuccess(response.data.user));
      }
    } catch (error) {
      dispatch(userActions.loginFail(error.response.data.message));
    }
  };
};

// load user if user refresh the page #cookie store
export const loadUser = () => {
  return async (dispatch) => {
    dispatch(userActions.loginRequest());
    try {
      const response = await axios.get("/api/v1/users/me");
      if (response.data.status === "success") {
        dispatch(userActions.loginSuccess(response.data.user));
      }
    } catch (error) {
      dispatch(userActions.loginFail(error.response.data.message));
    }
  };
};

// update profile
export const updateProfile = (userData) => {
  return async (dispatch) => {
    dispatch(profileActions.profileRequest());
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.patch(
        "/api/v1/users/updateUser",
        userData,
        config
      );
      if (response.data.status === "success") {
        dispatch(profileActions.profileSuccess());
      }
    } catch (error) {
      dispatch(profileActions.profileFail(error.response.data.message));
    }
  };
};

// chnage the user password with current password
export const updateMyPassword = (userData) => {
  return async (dispatch) => {
    dispatch(profileActions.profileRequest());
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.patch(
        "/api/v1/users/updateMypassword",
        userData,
        config
      );
      if (response.data.status === "success") {
        dispatch(profileActions.profileSuccess());
      }
    } catch (error) {
      dispatch(profileActions.profileFail(error.response.data.message));
    }
  };
};

// forgot the password
export const forgotPassword = (userData) => {
  return async (dispatch) => {
    dispatch(forgotPasswordActions.forgotPasswordRequest());
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post(
        "/api/v1/users/forgotPassword",
        userData,
        config
      );
      if (response.data.status === "success") {
        dispatch(
          forgotPasswordActions.forgotPasswordSuccess(response.data.message)
        );
      }
    } catch (error) {
      dispatch(
        forgotPasswordActions.forgotPasswordFail(error.response.data.message)
      );
    }
  };
};

// reset password
export const resetPassword = (token, userPasswords) => {
  return async (dispatch) => {
    dispatch(forgotPasswordActions.forgotPasswordRequest());
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.patch(
        `/api/v1/users/resetPassword/${token}`,
        userPasswords,
        config
      );
      if (response.data.status === "success") {
        dispatch(forgotPasswordActions.resetPasswordSuccess());
      }
    } catch (error) {
      dispatch(
        forgotPasswordActions.forgotPasswordFail(error.response.data.message)
      );
    }
  };
};

// logout the uset
export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/v1/users/logout");
      if (response.data.status === "success") {
        dispatch(userActions.logoutSuccess());
      }
    } catch (error) {
      dispatch(userActions.logoutFail(error.response.data.message));
    }
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch(userActions.clearError());
  };
};
