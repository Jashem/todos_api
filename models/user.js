var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  name: String
});

var User = mongoose.model("User", userSchema);

module.exports = User;
