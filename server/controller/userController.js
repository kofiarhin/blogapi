const User = require("../Models/User");
const bcrypt = require("bcrypt");

// token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODA4YzhhNTFiNmIzNTk0MmIyMzQ4NyIsImlhdCI6MTY1MjY3MzM5OSwiZXhwIjoxNjU1MjY1Mzk5fQ.kMLZpbc8LyIx-5EZtDm8vqyd7msEBby2kTcb2JSspEU"

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).json({ user: user._id });
  } catch (error) {
    res
      .status(400)
      .json({ errors: { message: "there was a problem creating user" } });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { createToken } = require("../utils/helper");

  const user = await User.findOne({ email });

  if (!user) {
    res.json({ error: "user not found" });
  } else {
    // compare password
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      res.json({ user: user.id, token: createToken(user._id) });
    } else {
      res.json({ error: "please check details and try again " });
    }
  }
};

const getProfile = (req, res) => {
  res.json(req.user);
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  getProfile,
};
