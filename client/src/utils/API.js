import axios from "axios";

export default {
  searchArticles: function(query) {
    return axios.get("/api/articles", { params: { q: query } });
  },
  getArticles: function() {
    return axios.get("/api/saved");
  },
  deleteArticle: function(id) {
    return axios.delete("/api/saved/" + id);
  },
  saveArticle: function(articleData) {
    return axios.put("/api/articles", articleData);
  }
};