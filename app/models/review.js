const mongoose = require("mongoose");
const reviewShcema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    review_text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewShcema);
module.exports = Review;
