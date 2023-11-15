const express = require("express");
const router = express.Router();
const validateBody = require("../middleware/validateBody");
const asyncWrapper = require("../middleware/asyncWrapper");
const { registerSchema, loginSchema } = require("../utils/validateSchemas");
const { registration, login } = require("../controllers/authController");

//registration
router.post(
  "/sign-up",
  validateBody(registerSchema),
  asyncWrapper(registration)
);

//login
router.post("/sing-in", validateBody(loginSchema), asyncWrapper(login));

module.exports = router;
