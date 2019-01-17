var db = require("../models");

module.exports.getTodos = function(req, res) {
  db.Todo.find({ owner_id: req.user.id })
    .then(function(todos) {
      res.json(todos);
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports.createTodo = function(req, res) {
  req.body.name = req.sanitize(req.body.name);
  db.Todo.create({
    name: req.body.name,
    owner_id: req.user.id
  })
    .then(function(newTodo) {
      res.status(201).json(newTodo);
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports.showTodo = function(req, res) {
  db.Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
      res.json(foundTodo);
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports.updateTodo = function(req, res) {
  db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, {
    new: true
  })
    .then(function(updatedTodo) {
      res.json(updatedTodo);
    })
    .catch(function(err) {
      res.send(err);
    });
};

module.exports.deleteTodo = function(req, res) {
  db.Todo.deleteOne({ _id: req.params.todoId })
    .then(function() {
      res.send("Successfully deleted");
    })
    .catch(function(err) {
      res.send(err);
    });
};
