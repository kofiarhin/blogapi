const mongoose = require("mongoose");

const connect = () => {
  // connect to database
  mongoose.connect(process.env.MONGO_URI, () =>
    console.log("connected to database")
  );
};

module.exports = connect;
