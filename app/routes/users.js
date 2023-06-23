const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();
module.exports = () => {
  router.get("/", UserController.getAllUsers);
  router.get("/:id", UserController.getOneUser);
  router.put("/:id", UserController.updateOneUser);
  router.delete("/:id", UserController.deleteUser);
  return router;
};
