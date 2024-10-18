const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/paymentController");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/process", authUser, processPayment);

router.get("/getStripeApiKey", authUser, sendStripeApiKey);

module.exports = router;
