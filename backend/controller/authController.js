const User = require("../models/userModel");

const AppError = require("../utilis/appError");
const catchAsyncError = require("../utilis/catchAsyncError");
const sendToken = require("../utilis/sendToken");
const sendEmail = require("../utilis/email");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Signup a user
exports.signup = catchAsyncError(async (req, res, next) => {
  const cloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatar",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: cloud.public_id, url: cloud.secure_url },
  });
  sendToken(res, 201, user);
});

// login
exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("email and password field cannot be empty", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("email or password is incorrect", 401));
  }
  const isPasswordMatched = await user.verifyPassword(password, user.password);
  if (!isPasswordMatched) {
    return next(new AppError("email or password is incorrect", 401));
  }
  sendToken(res, 200, user);
});

exports.logout = (req, res, next) => {
  res.cookie("jwt_token", null, {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    message: "You have been logout successfully",
  });
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new AppError(`There is no user found with this ${email} email`, 400)
    );
  }

  // generate the random reset token
  const resetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  // const url = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/resetPassword/${resetToken}`;
  const url = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Hey we received your request of reset password . Don't worry we will help you to get your new password just click the below link \n link : ${url}`;

  try {
    await sendEmail({
      subject: "Password Recovery from Ecommerce",
      message,
      email: user.email,
    });
    res.status(200).json({
      status: "success",
      message: "Email has been sent successfully to your account",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error to sending Email , please try again later",
        500
      )
    );
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const hashResetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashResetToken,
    resetPasswordExpired: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("Token is invalid or expired, please try again", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new AppError("Password and confirm password does not match", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpired = undefined;
  await user.save();

  sendToken(res, 200, user);
});

exports.updateMyPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const isPasswordMatched = await user.verifyPassword(
    req.body.currentPassword,
    user.password
  );
  if (!isPasswordMatched) {
    return next(new AppError("You current password is not valid", 400));
  }

  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(
      new AppError("Password and confirm password does not match", 400)
    );
  }

  user.password = password;
  await user.save();

  sendToken(res, 200, user);
});
