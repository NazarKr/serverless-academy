const express = require('express');
const validateIpAddress = require('../middleware/validateBody');
const asyncWrapper = require('../middleware/asyncWrapper');
const { getUserLocation } = require('../controllers/locationController');
const router = express.Router();

/* GET home page. */
router.post("/", validateIpAddress, asyncWrapper(getUserLocation));

module.exports = router;
