/**
 * Name: seed.js
 * Location: server/scripts/seed.js (or adjust based on your project structure)
 */
const bcrypt = require("bcryptjs");
require("dotenv").config();
const connectDB = require("../config/db"); // 1. IMPORT YOUR CACHED DB CONFIG
const User = require("../models/User");

const users = [
  {
    firstName: "Alicia",
    lastName: "Reyes",
    age: 29,
    gender: "female",
    contactNumber: "09171234567",
    email: "alicia.reyes@robles.dev",
    role: "admin",
    username: "aliciareyes",
    password: "Alicia123!",
    address: "Sampaloc, Manila, Metro Manila",
    isActive: true,
  },
  {
    firstName: "Marco",
    lastName: "Santos",
    age: 31,
    gender: "male",
    contactNumber: "09182345678",
    email: "marco.santos@robles.dev", // 2. FIXED EMAIL TYPO ("C")
    role: "viewer",
    username: "marcosantos",
    password: "Marco123!",
    address: "Tondo, Manila, Metro Manila",
    isActive: true,
  },
  {
    firstName: "Bianca",
    lastName: "Cruz",
    age: 26,
    gender: "female",
    contactNumber: "09193456789",
    email: "bianca.cruz@robles.dev",
    role: "editor",
    username: "biancacruz",
    password: "Bianca123!",
    address: "Quezon City, Metro Manila",
    isActive: true,
  },
  {
    firstName: "Nathan",
    lastName: "Diaz",
    age: 34,
    gender: "male",
    contactNumber: "09214567890",
    email: "nathan.diaz@robles.dev",
    role: "viewer",
    username: "nathandiaz",
    password: "Nathan123!",
    address: "Pasig City, Metro Manila",
    isActive: true,
  },
  {
    firstName: "Jasmine",
    lastName: "Garcia",
    age: 28,
    gender: "female",
    contactNumber: "09225678901",
    email: "jasmine.garcia@robles.dev",
    role: "editor",
    username: "jasminegarcia",
    password: "Jasmine123!",
    address: "Makati City, Metro Manila",
    isActive: false,
  },
  {
    firstName: "Ethan",
    lastName: "Lopez",
    age: 33,
    gender: "male",
    contactNumber: "09236789012",
    email: "ethan.lopez@robles.dev",
    role: "viewer",
    username: "ethanlopez",
    password: "Ethan123!",
    address: "Taguig City, Metro Manila",
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    // 3. CONNECT TO THE REAL DB VIA YOUR ENV CONFIG
    await connectDB(); 

    console.log("🧹 Clearing old users out of the collection...");
    await User.deleteMany();

    console.log("🔒 Hashing user passwords...");
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    console.log("🌱 Inserting fresh seeds into Atlas...");
    await User.insertMany(hashedUsers);

    console.log("✅ Users seeded successfully!");
    
    // 4. EXIT PROCESS CLEANLY
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder error:", error);
    process.exit(1);
  }
};

seedDatabase();