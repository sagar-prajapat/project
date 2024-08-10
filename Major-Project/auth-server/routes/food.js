const express = require("express");
const { registerController, authController, loginController } = require("../controller/user");
const protect = require("../middleware/authMiddleware");
const { getAllFoods } = require("../controller/food");
router = express.Router();
router.post("/addfood",protect, createFood);
router.get("/getAllFoods",getAllFoods);

module.exports = router;