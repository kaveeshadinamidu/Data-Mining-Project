const exress = require("express");

const searchService = require("../services/searchService");

const router = exress.Router();

router.get("", async (req, res) => {
  const response = await searchService.searchQuery(req.query.q);
  res.status(200).send(response);
});

module.exports = router;
