var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'NAME CAN NOT BE BLANK',
    },

    completed: {
        type: Boolean,
        default: false,
    },

    created_at: {
        type: Date,
        default: Date.now,
    }
})

var Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;