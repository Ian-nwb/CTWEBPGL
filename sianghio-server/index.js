require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const app = express();

// Establish serverless-optimized connection
connectDB();

// Global Middleware
app.use(express.json());
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));

// Optimized CORS configuration (Handles all preflight automatically)
const corsOptions = {
  origin: "*", 
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 204, 
};

app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Root benchmark endpoint (Great for testing if Vercel is live)
app.get("/", (req, res) => {
  res.status(200).json({ status: "healthy", message: "Server is running perfectly on Vercel!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// ONLY call app.listen if we are NOT running in a Vercel serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ⚠️ CRITICAL FOR VERCEL: Export the app instance
module.exports = app;