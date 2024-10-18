const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const AppError = require("../utilis/appError");
const catchAsyncError = require("../utilis/catchAsyncError");

// create new order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  req.body.paidAt = Date.now();

  const newOrder = await Order.create(req.body);
  res.status(201).json({
    status: "success",
    order: newOrder,
  });
});

// for admin to check all orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  const totalAmount = orders.reduce(
    (acc, currOrder) => acc + currOrder.totalPrice,
    0
  );

  res.status(200).json({
    status: "success",
    totalAmount,
    orders,
  });
});

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(AppError(`No order found with ${req.params.id} id`, 404));
  }

  res.status(200).json({
    status: "success",
    order,
  });
});

// get logged in user all orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    status: "success",
    result: orders.length,
    orders,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// for admin for update order status
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(AppError(`No order found with ${req.params.id} id`, 404));
  }

  if (order.orderStatus === "delivered") {
    return next(new AppError(`You have already delivered this order`, 404));
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "delivered") {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
    order.deliveredAt = Date.now();
  }

  order.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "order status has been updated",
  });
});

// for admin for delete order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(AppError(`No order found with ${req.params.id} id`, 404));
  }

  await order.remove();

  res.status(200).json({
    status: "success",
    message: "order has been deleted",
  });
});
