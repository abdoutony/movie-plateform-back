const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/review");
module.exports = () => {
  router.get("/", ReviewController.getReviews);
  router.post("/", ReviewController.addReview);
  return router;
};
