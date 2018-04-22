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


const hostname = 'localhost';
const port = 8000;
const server = app.listen(port, hostname, function(err){
	if(err) console.log(err);
	else console.log("Server is running on localhost:8000");
});

