import { Typography } from "@mui/material";
import React from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";

import { Line, Doughnut } from "react-chartjs-2";

import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminAllProducts } from "../../store/product-actions";
import { getAllOrdersForAdmin } from "../../store/order/adminOrder-actions";
import { getAllUsers } from "../../store/user/adminUser-actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { adminProducts } = useSelector((state) => state.product);
  const { allOrders, allOrdersAmount } = useSelector(
    (state) => state.adminOrder
  );
  const { allUser } = useSelector((state) => state.adminUser);

  let outOfStock = 0;
  adminProducts &&
    adminProducts.forEach((currProduct) => {
      if (currProduct.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(adminAllProducts());
    dispatch(getAllOrdersForAdmin());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: "tomato",
        hoverBackgroundColor: "rgb(197, 72, 49)",
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, adminProducts && adminProducts.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - admin panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{allOrdersAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{adminProducts && adminProducts.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{allOrders && allOrders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{allUser && allUser.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
