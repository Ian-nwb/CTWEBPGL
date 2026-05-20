const Article = require('../models/Article');


const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: articles.length, 
      data: articles 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const createArticle = async (req, res) => {
  try {
    const { title, name, imageUrl, content } = req.body;

    const contentArray = typeof content === 'string' 
      ? content.split('\n').filter(paragraph => paragraph.trim() !== "") 
      : content;

    const article = await Article.create({
      title,
      name,
      imageUrl: imageUrl || "", // If imageUrl is null/undefined, save as empty string
      content: contentArray
    });

    res.status(201).json({ success: true, data: article });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Article 'name' (slug) must be unique." });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};


const updateArticle = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.content && typeof updateData.content === 'string') {
      updateData.content = updateData.content.split('\n').filter(p => p.trim() !== "");
    }

    const article = await Article.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
    res.status(200).json({ success: true, message: 'Article deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};