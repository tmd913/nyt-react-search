const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Matches with "/api/saved"
router.route("/")
  .get(articlesController.getArticles);

// Matches with "/api/saved/:id"
router.route("/:id")
  .delete(articlesController.remove);

module.exports = router;
