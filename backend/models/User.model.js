const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userScheam = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const userModel = mongoose.model("User", userScheam);
module.exports = userModel;
