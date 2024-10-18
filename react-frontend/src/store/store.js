import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import forgotPasswordSlice from "./forgotPassword-slice";
import adminOrderSlice from "./order/adminOrder-slice";
import orderSlice from "./order/order-slice";
import { adminProductSlice, productSlice } from "./product-slice";
import profileSlice from "./profile-slice";
import adminReviewSlice from "./review/adminReview-slice";
import userSlice from "./user-slice";
import adminUserSlice from "./user/adminUser-slice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    forgotPassword: forgotPasswordSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    adminProduct: adminProductSlice.reducer,
    adminOrder: adminOrderSlice.reducer,
    adminUser: adminUserSlice.reducer,
    adminReview: adminReviewSlice.reducer,
  },
});

export default store;
