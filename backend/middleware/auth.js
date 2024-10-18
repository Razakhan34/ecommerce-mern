const catchAsyncError = require("../utilis/catchAsyncError");
const jwt = require("jsonwebtoken");
const AppError = require("../utilis/appError");
const { promisify } = require("util");
const User = require("../models/userModel");

exports.authUser = catchAsyncError(async (req, res, next) => {
  let token;
  if (req.cookies.jwt_token) {
    token = req.cookies.jwt_token;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in . Please login to get access!", 401)
    );
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decode.id);
  if (!user) {
    return next(
      new AppError(
        "The User belongings to this token does not longer exists",
        "401"
      )
    );
  }
  req.user = user;
  next();
});

exports.authUserRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError("You are not allowed to access this resource", 401)
      );
    }
    next();
  };
};
