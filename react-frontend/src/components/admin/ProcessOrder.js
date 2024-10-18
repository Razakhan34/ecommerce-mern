import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { clearError, getOrderDetail } from "../../store/order/order-actions";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import "./ProcessOrder.css";
import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import {
  clearErrorOrderForAdmin,
  updateOrder,
} from "../../store/order/adminOrder-actions";
import { adminOrderActions } from "../../store/order/adminOrder-slice";

const ProcessOrder = () => {
  const { orderId } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, orderDetail } = useSelector((state) => state.order);
  const { error: updateError, orderUpdateStatus } = useSelector(
    (state) => state.adminOrder
  );

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(orderId, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrorOrderForAdmin());
    }
    if (orderUpdateStatus) {
      alert.success("Order updated successfully");
      dispatch(adminOrderActions.orderUpdateReset());
    }
    dispatch(getOrderDetail(orderId));
  }, [dispatch, error, alert, orderId, updateError, orderUpdateStatus]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display:
                  orderDetail.orderStatus === "delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{orderDetail.user && orderDetail.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {orderDetail.shippingInfo &&
                          orderDetail.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {orderDetail.shippingInfo &&
                          `${orderDetail.shippingInfo.address}, ${orderDetail.shippingInfo.city}, ${orderDetail.shippingInfo.state}, ${orderDetail.shippingInfo.country}, ${orderDetail.shippingInfo.pinCode}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          orderDetail.paymentInfo &&
                          orderDetail.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderDetail.paymentInfo &&
                        orderDetail.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>
                        {orderDetail.totalPrice && orderDetail.totalPrice}
                      </span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          orderDetail.orderStatus &&
                          orderDetail.orderStatus === "delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderDetail.orderStatus && orderDetail.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {orderDetail.orderItems &&
                      orderDetail.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display:
                    orderDetail.orderStatus === "delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {orderDetail.orderStatus === "processing" && (
                        <option value="shipped">Shipped</option>
                      )}

                      {orderDetail.orderStatus === "shipped" && (
                        <option value="delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
