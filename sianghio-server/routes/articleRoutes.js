const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Import middleware
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

// Public: Get articles | Protected: Create article
router.route("/")
  .get(getArticles) 
  .post(protect, createArticle); 

// Protected: Update and Delete
router.route("/:id")
  .put(protect, updateArticle)
  .delete(protect, deleteArticle);

module.exports = router;