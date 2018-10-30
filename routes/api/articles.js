const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Matches with "/api/articles"
router.route("/")
  .get(articlesController.searchArticles)
  .put(articlesController.update);

module.exports = router;
