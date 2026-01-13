const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });

const mongoose = require("mongoose");
const User = require("./models/User");
const Subject = require("./models/Subject");
const connectDB = require("./config/db");

const seedData = async () => {
  try {
    await connectDB();

    // Seed Admin
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@example.com",
        password: "123",
        isAdmin: true,
      });
      console.log("Admin user created successfully");
    }

    // Seed Subjects
    const subjects = [
      {
        name: "React",
        title: "React Concepts",
        path: "/react",
        icon: "Zap",
        color: "text-blue-500",
        order: 1,
      },
      {
        name: "JavaScript",
        title: "JavaScript Core",
        path: "/js",
        icon: "Code",
        color: "text-yellow-500",
        order: 2,
      },
      {
        name: "HTML & CSS",
        title: "HTML & CSS",
        path: "/html-css",
        icon: "Layers",
        color: "text-orange-500",
        order: 3,
      },
      {
        name: "TypeScript",
        title: "TypeScript",
        path: "/ts",
        icon: "FileCode",
        color: "text-blue-600",
        order: 4,
      },
    ];

    for (const sub of subjects) {
      const exists = await Subject.findOne({ path: sub.path });
      if (!exists) {
        await Subject.create(sub);
        console.log(`Subject ${sub.name} created`);
      }
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
