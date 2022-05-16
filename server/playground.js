const mongoose = require("mongoose");
const { create, update } = require("./Models/User");
const User = require("./Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb://localhost:27017/test", () => {
  console.log("connected to database");
});

const userOne = {
  name: "kevin Durant",
  email: "kevin@gmail.com",
  password: "password",
};

const userTwo = {
  name: "lebron james",
  email: "lebron@gmail.com",
  password: "password",
};
const userOneToken =
  "CI6MTY1MjU5MTc5NiwiZXhwIjoxNjUyODUwOTk2fQ.aFJHyaaHg92-mfA2xwPgkZeQFf9BWu3y369gPrFdEe4";

const userTwoToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODA4YzhhNTFiNmIzNTk0MmIyMzQ4NyIsImlhdCI6MTY1MjU5MTg3MiwiZXhwIjoxNjUyODUxMDcyfQ.jX_in9OjY92xKQ6nDEOvihr6pFbCLl-YHPOvYORl724";

// clear database
async function clearDB() {
  await User.deleteMany();
}

// get users
async function getUsers() {
  const users = await User.find();
  return users;
}

// create user
async function createUser(data) {
  const { name, email, password } = data;

  const user = new User({
    name,
    email,
    password,
  });
  await user.save();

  console.log("user created");
}

// get user by id
async function findUser(id) {
  return await User.findOne({ _id: id });
}

async function deleteUser(id) {
  const user = await User.find({ _id: id });

  if (user) {
    await user.remove();
    return user;
  }

  return null;
}

// login user
async function loginUser(email, password) {
  const user = await User.findOne({
    email,
  });
  if (user) {
    // compare password
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      console.log("you are logged in");

      const token = createToken(user.id);

      console.log(token);
    } else {
      console.log("password does not match");
    }
  } else {
    return null;
  }
}

// create token
function createToken(id) {
  const token = jwt.sign({ id }, "jwt secret", {
    expiresIn: "3d",
  });
  return token;
}

async function getData(token) {
  if (!token) {
    return null;
  }

  jwt.verify(token, "jwt secret", async (error, data) => {
    if (error) {
      console.log("You are not authorized");
      return;
    }

    // get users
    const users = await User.find({
      _id: { $ne: data.id },
    });

    console.log(users);
  });
}

// update user
async function updateUser(id, data) {
  const fields = Object.keys(data);

  const user = await User.findById(id);

  fields.forEach((field) => {
    user[field] = data[field];
  });

  await user.save();
}

// setup database
async function setupDatabase() {
  clearDB();
  await createUser(userOne);
  await createUser(userTwo);

  const users = await getUsers();

  console.log(users);
  console.log("database ready");
}

// run application

async function run() {
  // login user one

  loginUser(userTwo.email, userTwo.password);
}

run();

// loginUser("snake@gmail.com", "password");
// updateUser(id, { name: "snake d", email: "snake@gmail.com" });
// getUsers().then((data) => console.log(data));
// getData(token);

// createUser({
//   name: "kevin durant",
//   email: "kevin@gmail.com",
//   password: "password",
// });
