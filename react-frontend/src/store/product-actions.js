import axios from "axios";
import { adminProductActions, productActions } from "./product-slice";

export const getAllProducts = (
  keyword = "",
  currentPage = 1,
  price = [0, 150000],
  category,
  ratings = 0
) => {
  return async (dispatch) => {
    dispatch(productActions.productRequest());
    try {
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link += `&category=${category}`;
      }
      const response = await axios.get(link);
      if (response.data.status === "success") {
        dispatch(productActions.allProductSuccess(response.data));
      }
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch(productActions.productFail(message));
    }
  };
};
export const adminAllProducts = () => {
  return async (dispatch) => {
    dispatch(productActions.productRequest());
    try {
      const response = await axios.get("/api/v1/products/admin/products");
      if (response.data.status === "success") {
        dispatch(productActions.adminAllProductSuccess(response.data.products));
      }
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch(productActions.productFail(message));
    }
  };
};

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    dispatch(productActions.productRequest());
    try {
      const response = await axios.get(`/api/v1/products/${id}`);
      if (response.data.status === "success") {
        dispatch(productActions.singleProductSuccess(response.data.product));
      }
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch(productActions.productFail(message));
    }
  };
};

export const newReview = (reviewData) => {
  return async (dispatch) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.patch(
        "/api/v1/products/reviews",
        reviewData,
        config
      );
      if (data.status === "success") {
        dispatch(productActions.newProductReviewSuccess());
      }
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch(productActions.productFail(message));
    }
  };
};

export const createProduct = (productData) => {
  return async (dispatch) => {
    try {
      dispatch(adminProductActions.productRequest());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/products/",
        productData,
        config
      );
      if (data.status === "success") {
        dispatch(adminProductActions.newProductSuccess(data.product));
      }
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch(adminProductActions.productFail(message));
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(adminProductActions.productRequest());
      const { data } = await axios.delete(`/api/v1/products/${productId}`);
      if (data.status === "success") {
        dispatch(adminProductActions.deleteProductSuccess());
      }
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch(adminProductActions.productFail(message));
    }
  };
};

export const updateProduct = (productId, productData) => {
  return async (dispatch) => {
    try {
      dispatch(adminProductActions.productRequest());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.patch(
        `/api/v1/products/${productId}`,
        productData,
        config
      );
      if (data.status === "success") {
        dispatch(adminProductActions.updateProductSuccess());
      }
    } catch (error) {
      const message = error.response.data.message || error.message;
      dispatch(adminProductActions.productFail(message));
    }
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch(productActions.clearError());
  };
};

export const clearErrorForAdminProduct = () => {
  return (dispatch) => {
    dispatch(adminProductActions.clearError());
  };
};
