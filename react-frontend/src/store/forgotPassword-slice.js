import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading: false,
  error: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: INITIAL_STATE,
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
    },
    resetPasswordReset(state) {
      state.isUpdated = false;
    },
    forgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const forgotPasswordActions = forgotPasswordSlice.actions;

export default forgotPasswordSlice;
