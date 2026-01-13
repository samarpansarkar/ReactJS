const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connString =
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TEST || process.env.MONGO_URI + "_test"
        : process.env.MONGO_URI;

    const conn = await mongoose.connect(connString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
