const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');
const {err_handler, async_wrapper} = require('../helpers/helpers');
const usr = express.Router();


usr.get('/signup', function(req, res){
	
	res.send('GET/SINGUP');
});

usr.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/todos', // redirect to the secure profile section
		failureRedirect : '/signup'
}));



usr.get('/login', function(req, res){
	
	res.send('GET/SINGUP');
});


usr.post('/login', passport.authenticate('local-login', {
	successRedirect : '/todos',
	failureRedirect : '/login'
}));

usr.get('/logout', async_wrapper(async function(req, res, next){
	req.logout();
	req.redirect('/login');
}));


module.exports = usr;