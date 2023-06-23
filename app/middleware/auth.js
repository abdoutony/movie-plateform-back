const jwt = require("jsonwebtoken");
const User = require("../models/user");
const checkLogin = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const user = jwt.decode(token, process.env.TOKEN_KEY);
    if (!user) {
      return res.status(403).send("Invalid token");
    } else {
      const existsUser = await User.findOne({ email: user.user_email });
      if (!existsUser) {
        return res.status(403).send("Not allowed");
      } else {
        return next();
      }
    }
  } else {
    return res.status(403).send("Not allowed");
  }
};

module.exports = checkLogin;
