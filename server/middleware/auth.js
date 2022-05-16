const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    // verify token
    jwt.verify(token, "jwt secret", async (error, decoded) => {
      if (error) {
        res.status(401).json({ error: "unauthorized" });
      } else {
        const user = await User.findOne({ _id: decoded.id }).select(
          "-password"
        );

        req.user = user;
        next();
      }
    });
  } else {
    res.json({ error: "unauthorized --- no token " });
  }
};

module.exports = auth;
