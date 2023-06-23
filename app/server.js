const express = require("express");
require("dotenv").config();
require("./config/db").connect();
const apiRoutes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

//set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up cors
// const corsOptions = {
//   origin: "http://example.com",
// };
app.use(cors());

// configure public and uploads
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

app.use("/api", apiRoutes());
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
