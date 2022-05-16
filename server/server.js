const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const User = require("./Models/User");
const userRouter = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const connect = require("./config/db");

connect();

// setup middlewares
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening on " + port));
