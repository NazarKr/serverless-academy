const express = require("express");
const router = express.Router();

const { shortenLink, getShortLink } = require("../controllers/linkControllers");
const asyncWrapper = require("../middleware/asyncWrapper");
const validateUrlAddress = require("../middleware/validateUrlAddress");

router.post("/shorLink", validateUrlAddress, asyncWrapper(shortenLink));

router.get("/:linkToken", asyncWrapper(getShortLink));

module.exports = router;
