const AppError = require("../utilis/appError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Mongodb cast error wrong mongodb id
  if (err.name === "CastError") {
    const message = `Resource not found . Invalid ${err.path} : ${err.value}`;
    err = new AppError(message, 400);
  }
  // mongodb validattion error
  if (err.name === "ValidationError") {
    const messageArray = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid Input Data. ${messageArray.join(". ")}`;
    err = new AppError(message, 400);
  }

  // mongodb duplicate field
  if (err.code === 11000) {
    const duplicateField = Object.entries(err.keyValue)[0];
    const message = `Duplicate ${duplicateField[0]} entered . ${duplicateField[1]} is already exixts`;
    err = new AppError(message, 400);
  }
  // json web token error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token. please log in again!!`;
    err = new AppError(message, 401);
  }
  // json web token expire error
  if (err.name === "TokenExpiredError") {
    const message = "Your token has expired. please login again";
    err = new AppError(message, 401);
  }
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
