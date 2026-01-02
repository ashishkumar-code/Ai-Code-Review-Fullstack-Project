const express = require("express");
const router = express.Router();

//middleware
const { signupValidation , loginValidation } = require('../middlewares/authValidator')

//controllers
const {signup, login} = require('../controllers/auth.controller')

router.post("/signup",signupValidation, signup);
router.post("/login",loginValidation, login);

module.exports = router;
