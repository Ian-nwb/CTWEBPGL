import axios from 'axios';
import constants from '../../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

// Add interceptor to attach token for protected actions
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Rename this to getArticles to match your ArticleListPage import
export const getArticles = () => API.get('/');
export const fetchArticles = getArticles;
export const fetchArticleById = (id) => API.get(`/${id}`);

export const createArticle = (articleData) => API.post('/', articleData);

export const updateArticle = (id, articleData) => API.put(`/${id}`, articleData);

export const deleteArticle = (id) => API.delete(`/${id}`);