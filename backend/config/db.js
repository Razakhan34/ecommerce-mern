const mongoose = require("mongoose");

module.exports = async () => {
  const connect = await mongoose.connect(process.env.MONGODB_ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(
    `Mongodb connected successfully on host ${connect.connection.host}`
  );
};
