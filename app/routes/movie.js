const express = require("express");
const MovieController = require("../controllers/movie");
const router = express.Router();
const checkLogin = require("../middleware/auth");
const multer = require("../middleware/upload");
module.exports = () => {
  router.get("", MovieController.getAllMovies);
  router.post("", multer.single("poster"), MovieController.addMovie);
  router.get("/:id", MovieController.getOneMovie);
  router.put("/:id", MovieController.updateMovie);
  router.delete("/:id", MovieController.deleteMovie);
  return router;
};
