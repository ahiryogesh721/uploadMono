const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: String,
  password: String,
  refreshToken: {
    type: String,
    required: false,
  },
});

const userModel = model("user", userSchema);

module.exports = userModel;
