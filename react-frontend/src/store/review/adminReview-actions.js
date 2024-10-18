import axios from "axios";
import { adminReviewActions } from "./adminReview-slice";

// Get all Review for admin
export const getAllReviews = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(adminReviewActions.adminReviewRequest());
      const { data } = await axios.get(
        `/api/v1/products/reviews?productId=${productId}`
      );
      if (data.status === "success") {
        dispatch(adminReviewActions.allReviewSuccess(data.reviews));
      }
    } catch (error) {
      dispatch(adminReviewActions.adminReviewFail(error.response.data.message));
    }
  };
};

// Get all Review for admin
export const deleteReview = (reviewId, productId) => {
  return async (dispatch) => {
    try {
      dispatch(adminReviewActions.adminReviewRequest());
      const { data } = await axios.delete(
        `/api/v1/products/reviews?productId=${productId}&id=${reviewId}`
      );
      if (data.status === "success") {
        dispatch(adminReviewActions.reviewDeleteStatus());
      }
    } catch (error) {
      dispatch(adminReviewActions.adminReviewFail(error.response.data.message));
    }
  };
};

export const clearErrorReview = () => {
  return (dispatch) => {
    dispatch(adminReviewActions.clearError());
  };
};
