const express = require('express');
const mongoose = require('mongoose');
const Todos = require('../models/todo');

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

Td.get('/app/todos', isLoggedIn, function(req, res){
	const _id = req.params.user._id;
	Todos.find({create: _id}, function(err, todos){
		if(err)
			res.status(400).json(err);
		res.json(todos);
	});
});

Td.post('/app/todos/:id', isLoggedIn, function(req, res){
	var td = new Todos(req.body);
	todo.creator = req.params.user;
	td.save(function(err, tod){
		if(err)
			res.status(400).json(err);
		else
			res.json(tod);
	});
});

Td.get('/app/todos/:id', isLoggedIn, hasAuth, function(req, res){

	const _id = rq.params.id;
	Todos.findOne({_id}, function(err, td){
		if(err)
			res.status(400).json(err);
		else 
			res.json(td);
	});
});

Td.route('app/todo/:id'), isLoggedIn, hasAuth, function(req, res){
	const temp_todo;
	var _id = req.params.id;
	Todos.findOne({_id}, function(err, td){
		if(err)
			res.status(400),json(err);
		else
			temp_todo = td;
	});
	temp_todo.task = req.body.task;
	temp_todo.isCompleted = req.body.isCompleted;
	temp_todo.save(function(err, td){
		if(err)
			res.status(400).json(err);
	});

	Todos.findOneAndRemove({_id}, function(err, td){
		if(err)
			res.status(400).json(err);
		else
			res.json(td);
	});
});

Td.delete('app/todo/:id', isLoggedIn, hasAuth, function(req, res){
	Todos.findOneAndRemove({req.params.id}, function(req, res){
		if(err)
			res.status(400).json(err);
		if(!td)
			res.status(404).json({ message: 'Task not found.' });
		else 
			res.json({ message: `task ${td._id} deleted.` });
	});
});