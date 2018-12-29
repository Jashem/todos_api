var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/todo_api', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');