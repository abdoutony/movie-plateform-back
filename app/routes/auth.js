const express = require("express");
const router = express.Router();
const checkLogin = require("../middleware/auth");
const AuthController = require("../controllers/auth");
module.exports = () => {
  router.post("/login", AuthController.login);
  router.post("/register", AuthController.register);
  router.get("/verify-login", checkLogin, (req, res) => {
    res.status(200).send("You are allowed to pass");
  });
  return router;
};
