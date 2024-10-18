import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE_PRODUCT = {
  loading: false,
  error: null,
  products: [],
  product: {},
  totalProducts: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState: INITIAL_STATE_PRODUCT,
  reducers: {
    productRequest(state) {
      state.loading = true;
    },
    allProductSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.resultPerPage = action.payload.resultPerPage;
    },
    adminAllProductSuccess(state, action) {
      state.loading = false;
      state.adminProducts = action.payload;
    },
    singleProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    newProductReviewSuccess(state) {
      state.loading = false;
      state.reviewStatus = true;
    },
    newProductReviewReset(state) {
      state.loading = false;
      state.reviewStatus = false;
    },
    productFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

const INITIAL_STATE_ADMIN_PRODUCT = {
  loading: false,
  error: null,
  product: {},
  createProductStatus: false,
  deleteProductStatus: false,
  updateProductStatus: false,
};

export const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: INITIAL_STATE_ADMIN_PRODUCT,
  reducers: {
    productRequest(state) {
      state.loading = true;
    },
    newProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
      state.createProductStatus = true;
    },
    newProductReset(state, action) {
      state.createProductStatus = false;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.updateProductStatus = true;
    },
    updateProductReset(state, action) {
      state.updateProductStatus = false;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
      state.deleteProductStatus = true;
    },
    deleteProductReset(state, action) {
      state.deleteProductStatus = false;
    },
    productFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const productActions = productSlice.actions;
export const adminProductActions = adminProductSlice.actions;
