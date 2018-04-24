const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	task: String,
	isCompleted: Boolean,
	creator: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Todo', todoSchema);


