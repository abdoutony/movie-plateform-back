const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    poster: {
      type: String,
    },

    trailer: {
      type: String,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
