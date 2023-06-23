const mongoose = require("mongoose");
const Movie = require("../models/movie");
const User = require("../models/user");
const moviesData = require("./data/movies.json");
const usersData = require("./data/users.json");
require("dotenv").config();
const { MONGO_PROD_URL } = process.env;
mongoose
  .connect(MONGO_PROD_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (x) => {
    console.log(`Connected to database ${x.connections[0].name}`);
    await Movie.insertMany(moviesData);
    await User.insertMany(usersData);
    console.log("Database Seed Finished");
    mongoose.connection.close();
    console.log("Disconnected from db ****");
    process.exit(0);
  });
