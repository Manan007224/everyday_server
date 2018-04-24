const express = require('express');
const mongoose = require('mongoose');
const Todos = require('../models/todo');
const {async_wrapper} = require('../helpers/helpers');
const Td = express.Router();

// Add the middle-ware function for the route
// This function checks if the user is logged in or not
// If the user is not logged in then send 401 response and redirect the user to '/'

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();
	else {
		res.redirect('/');
		return res.status(401).send({
			message: 'User is not logged in'
		});	
	}
}

function hasAuth(req, res, next) {
	if(req.todo.creator.id = req.user.id)
		return next();
	else {
		res.redirect('/');
		return res.status(404).send({
			message: 'Not valid user'
		});
	}
}

var find_error = function(err) {
	if(err.errors) {
		for(var er in err.errors) {
			if(err.errors[er].message) return err.errors[er].message;
		}
		return 'Unknown server error';
	}
}

var err_handler = function(err, res) {
	return res.status(400).send({message: find_error(err)});
}

Td.get('/todos', isLoggedIn, function(req, res, next){
	const todos = Todos.find({creator: req.user._id}, (err, todo) => {
		if(err) return err_handler(err, res);
		else res.json(todo);
	});
});

Td.post('/todos', isLoggedIn, function(req, res, next){
	var td = {task: req.body.task, isCompleted: req.body.isCompleted, creator: req.user};
	var td_s = new Todos(td);
	td_s.save((err, todo) => {
		if(err) return err_handler(err, res);
		else res.json(todo);
	});
});

Td.get('/todos/:id', isLoggedIn, hasAuth, async_wrapper(async function(req, res, next){
	var _id = req.params.id;
	const todo = await Todos.findOne({_id}, (err, todo) => {
		if(err) return err_handler(err, res);
		else res.json(todo);
	});
}));

Td.put('/todo/:id', isLoggedIn, hasAuth, async_wrapper(async function(req, res, next){
	var _id = req.params.id;
	await Todos.findOneAndUpdate({_id}, req.body, {new: true}, (err) => {
		if(err, todo) return err_handler(err, res);
		else res.json(todo);
	});
}));

Td.delete('/todo/:id', isLoggedIn, hasAuth, async_wrapper(async function(req, res, next){
	var _id = req.params.id;
	await Todos.findOneAndRemove({_id}, (err, todo) => {
		if(err) return err_handler(err, res);
		else res.json(todo);
	});
}));


module.exports = Td;