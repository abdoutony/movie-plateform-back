const Movie = require("../models/movie");
const path = require("path");
const fs = require("fs");
function deleteFileFromDisk(filename) {
  let pathname = path.join(__dirname, "../" + "public/uploads/" + filename);
  fs.unlink(pathname, (err) => {
    if (err) throw err;
    console.log("File deleted ");
  });
}

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      msg: "Get with success",
      data: movies,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.getOneMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    res.status(200).json({
      msg: "Get with success",
      data: movie,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addMovie = async (req, res) => {
  try {
    const { title, description, category, trailer } = req.body;
    //validation
    if (!(title && description && category && trailer)) {
      res.status(401).send("All inputs are required");
    }

    const url = req.protocol + "://" + req.get("host"); // http://localhost:4500

    const new_movie = new Movie({
      title,
      description,
      category,
      trailer,
      poster: url + "/uploads/" + req.file.filename,
    });

    const saved_movie = await new_movie.save();
    res.status(201).json({
      msg: "Create with success",
      data: saved_movie,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateMovie = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(404).send("Not found");
    }
    let imgName = movie.poster.split("/")[4];
    // before we delete the movie ,we remove first the image from the disk
    deleteFileFromDisk(imgName);
    await Movie.deleteOne({ _id: req.params.id });
    res.status(200).send("Movie deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
