const jwt = require("jsonwebtoken");

const JWT_SECRET = "jwt secret";
const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
};

const checkToken = (token) => {
  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      return null;
    }
    return decoded;
  });
};
module.exports = {
  createToken,
  checkToken,
};
