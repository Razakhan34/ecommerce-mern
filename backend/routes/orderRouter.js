const express = require("express");
const {
  createOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controller/orderController");
const { authUser, authUserRole } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .post(authUser, createOrder)
  .get(authUser, authUserRole("admin"), getAllOrders);

router.get("/myOrders", authUser, myOrders);

router
  .route("/:id")
  .get(authUser, getSingleOrder)
  .patch(authUser, authUserRole("admin"), updateOrderStatus)
  .delete(authUser, authUserRole("admin"), deleteOrder);

module.exports = router;
