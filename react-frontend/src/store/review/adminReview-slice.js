import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
  loading: false,
  error: null,
  reviews: [],
  reviewDeleteStatus: false,
};

const adminReviewSlice = createSlice({
  name: "adminReview",
  initialState: INTIAL_STATE,
  reducers: {
    adminReviewRequest(state) {
      state.loading = true;
    },
    allReviewSuccess(state, action) {
      state.loading = false;
      state.reviews = action.payload;
    },
    reviewDeleteStatus(state) {
      state.loading = false;
      state.reviewDeleteStatus = true;
    },
    reviewDeleteReset(state) {
      state.reviewDeleteStatus = false;
    },
    adminReviewFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const adminReviewActions = adminReviewSlice.actions;

export default adminReviewSlice;
