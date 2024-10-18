const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// config .env
dotenv.config({ path: "backend/config/config.env" });

const globalErrorHandler = require("./controller/errorController");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const paymentRouter = require("./routes/paymentRouter");
const orderRouter = require("./routes/orderRouter");

const app = express();

// Global middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());

// Router
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/orders", orderRouter);

// global error middleware
app.use(globalErrorHandler);

module.exports = app;
