import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
  loading: false,
  error: null,
  allUser: [],
  user: {},
  userUpdateStatus: false,
  userDeleteStatus: false,
};

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: INTIAL_STATE,
  reducers: {
    adminUserRequest(state) {
      state.loading = true;
    },
    allUserSuccess(state, action) {
      state.loading = false;
      state.allUser = action.payload;
    },
    userDetailSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    userDeleteStatus(state) {
      state.loading = false;
      state.userDeleteStatus = true;
    },
    userDeleteReset(state) {
      state.userDeleteStatus = false;
    },
    userUpdateStatus(state) {
      state.loading = false;
      state.userUpdateStatus = true;
    },
    userUpdateReset(state) {
      state.userUpdateStatus = false;
    },
    adminUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const adminUserActions = adminUserSlice.actions;

export default adminUserSlice;
