const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });

const mongoose = require("mongoose");
const User = require("./models/User");
const connectDB = require("./config/db");

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin exists
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("Admin user already exists");
      process.exit();
    }

    const user = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "123", // Will be hashed by pre-save hook
      isAdmin: true,
    });

    console.log("Admin user created successfully");
    console.log("Email: admin@example.com");
    console.log("Password: 123");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
