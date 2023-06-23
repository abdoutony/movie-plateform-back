const Review = require("../models/review");
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("movie_id user_id");
    res.status(200).json({
      msg: "Get with success",
      data: reviews,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addReview = async (req, res) => {
  try {
    const { user_id, movie_id, review_text } = req.body;
    // validation
    const new_review = new Review({
      user_id,
      movie_id,
      review_text,
    });
    const saved_review = await new_review.save();
    res.status(201).send({
      msg: "Create with success",
      data: saved_review,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
