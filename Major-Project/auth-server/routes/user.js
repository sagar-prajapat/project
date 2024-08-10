const express = require("express");
const { registerController, authController, loginController } = require("../controller/user");
const protect = require("../middleware/authMiddleware");
router = express.Router();
router.post("/register", registerController);
router.post("/get-user", protect, authController);
router.post("/login", loginController);
router.post("/verifyAotp", verifyOtpController);
module.exports = router;