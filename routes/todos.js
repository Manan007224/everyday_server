const express = require('express');
const mongoose = require('mongoose');
const Todos = require('../models/todo');
const {err_handler, async_wrapper} = require('/../helpers/helpers');
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

Td.get('/app/todos', isLoggedIn, async_wrapper(async function(req, res, next){
	const todos = await Todos.find({}, err_handler);
	res.status(200).json(todos);
	res.end('Done');
}));

Td.post('/app/todos/:id', isLoggedIn, async_wrapper(async function(req, res, next){
	var td = {task: req.body.task, isCompleted: req.body.isCompleted, creator: req.user};
	await td.save(err_handler);
	res.end('Done');
}));

Td.get('/app/todos/:id', isLoggedIn, hasAuth, async_wrapper(async function(req, res, next){
	const todo = await Todos.findOne({req.params.id}, err_handler);
	res.status(200).json(todo);
	res.end('Done');
}));

Td.put('app/todo/:id', isLoggedIn, hasAuth, async_wrapper(async function(req, res, next){
	var _id = req.params.id;
	const todo_r = await Todos.findOneAndUpdate({_id}, req.body, {new: true}, err_handler);
	res.status(200).json(todo_r);
	res.end('Done');
}));

Td.delete('app/todo/:id', isLoggedIn, hasAuth, async_wrapper(async function(req, res, next){
	await Todos.findOneAndRemove({req.params.id}, err_handler);
	res.end('Done');
}));