const app = require("./app");
const connectDB = require("./config/db");
const cloudinary = require("cloudinary");

// Handle UNCAUGHT EXCEPTION ERROR
// handle the synchoronos error like programming error
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception error 💥 " + err.message);
  console.log("shutting down the server due to uncaught Exception");
  process.exit(1);
});

// connection to database
connectDB();

// configuration of cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
// UNHANDLE PROMISE REJECTION
// handle the overall app async promise error if it reject
process.on("unhandledRejection", (err) => {
  console.log("Unhandle rejection error 💥 " + err.message);
  console.log("shutting down the server due to unhandle rejection");
  server.close(() => {
    process.exit(1);
  });
});
