const User = require("../models/userModel");
const AppError = require("../utilis/appError");
const catchAsyncError = require("../utilis/catchAsyncError");
const cloudinary = require("cloudinary");

const filterBody = (obj, ...tobeFiltered) => {
  const objCopy = { ...obj };
  Object.keys(objCopy).forEach((curr) => {
    if (!tobeFiltered.includes(curr)) {
      delete objCopy[curr];
    }
  });
  return objCopy;
};

// Get all user detail
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    status: "success",
    users,
  });
});

// Get User detail --admin
exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
// Get Single user detail --admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new AppError(`There is no user found with this ${req.params.id} id`, 400)
    );
  }
  res.status(200).json({
    status: "success",
    user,
  });
});

// update user detail except password
exports.updateUser = catchAsyncError(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This router is not for update password use /updateMyPassword",
        400
      )
    );
  }

  const updateData = filterBody(req.body, "name", "email");

  if (req.body.avatar) {
    const user = await User.findById(req.user._id);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    const cloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatar",
      width: 150,
      crop: "scale",
    });

    updateData.avatar = {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    };
  }

  await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
  });
});
// update user role for admin
exports.updateUserForAdmin = catchAsyncError(async (req, res, next) => {
  const updateData = filterBody(req.body, "name", "email", "role");

  const user = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    user,
  });
});

// delete user for admin
exports.deleteUserForAdmin = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new AppError(`There is no user found with this ${req.params.id} id`, 400)
    );
  }
  await user.remove();
  res.status(200).json({
    status: "success",
    message: "user has been removed successfully",
  });
});
