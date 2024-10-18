const sendToken = (res, statusCode, user) => {
  const token = user.getAuthToken();
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt_token", token, cookieOptions);

  // Remove the password field from output
  user.password = undefined;

  res.status(200).json({
    status: "success",
    user,
    token,
  });
};

module.exports = sendToken;
