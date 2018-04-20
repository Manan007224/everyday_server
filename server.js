'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//	Adding the database schema and connecting the database. 
//  todo model example :
//  {
//		task: "Create React App",
//		isCompleted: false
//	}

const Todos = require('./models/todo');
mongoose.connect('mongodb://127.0.0.1/todo_schema', function(err){
	if(err) console.log(err);
	else console.log("Connected properly");
});


//	The restful api contains four kinds of basic routes
// 	get, post, delete and put
// 	there are two variations of get where we can get either all the routes or just one route

app.post('/', function(req, res){
	const Td = new Todos(req.body);
	Td.save(function(err, td){
		if(err) {
			res.status(400).json(err);
		}
		else {
			res.json(td);
		}
	});
});

app.get('/:id', function(req, res){

	const _id = req.params.id;
	Todos.findOne({_id}, function(err, td){
		if(err) {
			res.status(400).json(err);
		}
		if(!td) {
			res.status(404).json({ message: 'task not found.' });
		}
		res.json(td);
	});
});

app.get('/', function(req, res){

	Todos.find({}, function(err, tds){
		if(err) {
			res.status(400).json(err);
		}
		res.json(tds);
		console.log(res);
	});
});


app.put('/:id', function(req, res){

	const _id = req.params.id;
	Todos.findOneAndUpdate({_id}, req.body, {new:true}, function(err, contact){
		if(err) {
			res.status(400).json(err);
		}
		res.json(td);
	});
});

app.get('/:id', function(req, res){

	const _id = req.params.id;
	Todos.findOneAndRemove({_id}, function(err, td){
		if(err) {
			res.status(400).json(err);
		}
		if(!td) {
			res.status(404).json({ message: 'Task not found.' });
		}
		res.json({ message: `task ${td._id} deleted.` });
	});
});

const hostname = 'localhost';
const port = 8000;
const server = app.listen(port, hostname, function(err){
	if(err) console.log(err);
	else console.log("Server is running on localhost:8000");
});

