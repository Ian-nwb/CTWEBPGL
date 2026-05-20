const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); 
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");


router.route("/")
  .get(getArticles) 
  .post(protect, createArticle); 


router.route("/:id")
  .put(protect, updateArticle)
  .delete(protect, deleteArticle);

module.exports = router;