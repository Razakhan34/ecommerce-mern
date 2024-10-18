import React, { useEffect, useState } from "react";
import Header from "./components/layout/header/Header";
import Home from "./components/home/Home";
import ProductDetails from "./components/product/ProductDetails";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import Products from "./components/product/Products";
import SearchProducts from "./components/product/SearchProducts";
import Footer from "./components/layout/footer/Footer";
import LoginSignUp from "./components/user/LoginSignUp";
import UserOptions from "./components/layout/header/UserOptions";
import { clearError, loadUser } from "./store/user-actions";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import MyOrders from "./components/order/MyOrders";
import OrderDetail from "./components/order/OrderDetail";
import NotFound from "./components/layout/notfound/NotFound.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder.js";
import UserList from "./components/admin/UserList.js";
import UpdateUser from "./components/admin/UpdateUser.js";
import ProductReview from "./components/admin/ProductReview.js";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeKey = async () => {
    const { data } = await axios.get("/api/v1/payment/getStripeApiKey");
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    getStripeKey();

    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute path="/process/payment" exact>
            <Payment />
          </ProtectedRoute>
        </Elements>
      )}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/product/:id" exact>
          <ProductDetails />
        </Route>
        <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/products/:keyword">
          <Products />
        </Route>
        <Route path="/search">
          <SearchProducts />
        </Route>
        <Route path="/login">
          <LoginSignUp />
        </Route>
        <ProtectedRoute path="/account">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/me/update" exact>
          <UpdateProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/password/update" exact>
          <UpdatePassword />
        </ProtectedRoute>
        <Route path="/password/forgot" exact>
          <ForgotPassword />
        </Route>
        <Route path="/password/reset/:token" exact>
          <ResetPassword />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <ProtectedRoute path="/shipping" exact>
          <Shipping />
        </ProtectedRoute>

        <ProtectedRoute path="/success" exact>
          <OrderSuccess />
        </ProtectedRoute>
        <ProtectedRoute path="/orders" exact>
          <MyOrders />
        </ProtectedRoute>

        <ProtectedRoute path="/order/confirm" exact>
          <ConfirmOrder />
        </ProtectedRoute>

        <ProtectedRoute path="/order/:orderId" exact>
          <OrderDetail />
        </ProtectedRoute>

        <ProtectedRoute isAdmin={true} path="/admin/dashboard" exact>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute isAdmin={true} path="/admin/products" exact>
          <ProductList />
        </ProtectedRoute>
        <ProtectedRoute isAdmin={true} path="/admin/product" exact>
          <NewProduct />
        </ProtectedRoute>
        <ProtectedRoute isAdmin={true} path="/admin/product/:productId" exact>
          <UpdateProduct />
        </ProtectedRoute>
        <ProtectedRoute isAdmin={true} path="/admin/orders" exact>
          <OrderList />
        </ProtectedRoute>
        <ProtectedRoute isAdmin={true} path="/admin/order/:orderId" exact>
          <ProcessOrder />
        </ProtectedRoute>
        <ProtectedRoute isAdmin={true} path="/admin/users" exact>
          <UserList />
        </ProtectedRoute>
        <ProtectedRoute isAdmin={true} path="/admin/user/:userId" exact>
          <UpdateUser />
        </ProtectedRoute>
        <ProtectedRoute isAdmin={true} path="/admin/reviews" exact>
          <ProductReview />
        </ProtectedRoute>
        {window.location.pathname !== "/process/payment" && (
          <Route>
            <NotFound />
          </Route>
        )}
      </Switch>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
