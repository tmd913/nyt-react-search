const router = require("express").Router();
const articleRoutes = require("./articles");
const savedRoutes = require("./saved");

// Article routes
router.use("/articles", articleRoutes);
// Saved routes
router.use("/saved", savedRoutes);

module.exports = router;