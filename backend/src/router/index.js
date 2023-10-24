const express = require("express");

const searchController = require("../controllers/searchController");

const router = express.Router();

router.use("/search", searchController);

module.exports = router;
