var mongoose = require("mongoose");
var keys = require("../config/key");
mongoose.set("debug", false);
mongoose.connect(
  keys.mongodb,
  { useNewUrlParser: true }
);
mongoose.set("useFindAndModify", false);
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
module.exports.User = require("./user");
