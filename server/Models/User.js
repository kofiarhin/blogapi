const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(this.password, salt);
  if (this.isModified("password")) {
    this.password = hash;
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
