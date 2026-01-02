const express = require("express");
const ensureAuth = require("../middlewares/auth");
const router = express.Router();

router.get("/home", ensureAuth, (req, res) => {
  console.log("logedin user :", req.user);

  res.status(200).json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "Laptop",
      price: 20000,
    },
  ]);
});

module.exports = router;
