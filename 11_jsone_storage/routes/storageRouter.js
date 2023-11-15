const express = require('express');
const asyncWrapper = require('../middleware/asyncWrapper');
const { putData, getData } = require("../controllers/dataController");
const router = express.Router();

router.get("/:json_data", asyncWrapper(getData));

router.put("/:json_data", asyncWrapper(putData));

module.exports = router;

