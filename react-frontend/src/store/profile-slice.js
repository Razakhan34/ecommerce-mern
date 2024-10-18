import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading: false,
  isUpdated: false,
  error: null,
};

const profileSlice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  reducers: {
    profileRequest(state) {
      state.loading = true;
    },
    profileSuccess(state) {
      state.loading = false;
      state.isUpdated = true;
    },
    profileReset(state, action) {
      state.isUpdated = false;
    },

    profileFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
