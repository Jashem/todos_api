var express = require("express");
var router = express.Router();
var helpers = require("../helpers/todos");

router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
});
router
  .route("/")
  .get(helpers.getTodos)
  .post(helpers.createTodo);

router
  .route("/:todoId")
  .get(helpers.showTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);

module.exports = router;
