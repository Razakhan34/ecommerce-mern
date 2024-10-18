import { createSlice } from "@reduxjs/toolkit";

const INITIAl_STATE = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
};
// login and signup will be the same
const userSlice = createSlice({
  name: "user",
  initialState: INITIAl_STATE,
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFail(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
