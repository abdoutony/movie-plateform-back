const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;
    // controll and validation
    if (!(firstName && lastName && email && password)) {
      return res.status(409).send("All inputs are required");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exists");
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const saved_user = await user.save();
    res.status(201).json({
      msg: "Create with succes",
      data: saved_user,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  // validation
  if (!(email && password)) {
    return res.status(400).send("All fields are required");
  }
  // verify if user exists in our database
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    //user exists in our database we can continue
    // 1 generate token
    const token = jwt.sign(
      {
        user_id: user._id,
        user_email: user.email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    user.token = token;
    res.status(200).json({
      msg: "User authenticated",
      token: user.token,
    });
  } else {
    return res.status(400).send("Incorrect email or password");
  }
};
