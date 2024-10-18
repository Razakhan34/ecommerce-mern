const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    maxlength: [40, "Name caanot exceed 40 character long"],
    minlength: [3, "Name Must have atleast 3 character"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    trim: true,
    unique: true,
    validate: {
      // message will be shown if function return false
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Email is not valid",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: [8, "Password must be have 8 charcter long"],
    select: false,
    validate: {
      validator: function (value) {
        return !value.toLowerCase().includes("password");
      },
      message: 'Password shouldn\'t contain "password" word',
    },
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
});

// encrypting the password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// JWT Token
userSchema.methods.getAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

// verfiy bcrypt password
userSchema.methods.verifyPassword = async function (candidatePass, hashPass) {
  return await bcrypt.compare(candidatePass, hashPass);
};

// generate random reset token
userSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordExpired = Date.now() + 10 * 60 * 1000;
  return token;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
