const express = require("express");
const router = express.Router();
const { getCurrentUser } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const asyncWrapper = require("../middleware/asyncWrapper");

/* GET users  */
router.get("/", authMiddleware, asyncWrapper(getCurrentUser));

module.exports = router;
