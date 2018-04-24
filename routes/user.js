const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');
const {err_handler, async_wrapper} = require('../helpers/helpers');
const usr = express.Router();


usr.get('/signup', async_wrapper(async function(req, res, next){
	res.end('GET/Users');
}));

usr.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/todos',
	failureRedirect : '/signup'
}));

usr.get('/login', async_wrapper(async function(req, res, next){
	res.end('GET/login');
}));

usr.post('/login', passport.authenticate('local-login', {
	successRedirect : '/todos',
	failureRedirect : '/login'
}));

usr.get('/logout', async_wrapper(async function(req, res, next){
	req.logout();
	req.redirect('/login');
}));


module.exports = usr;
