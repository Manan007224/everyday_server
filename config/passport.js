const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const email_validator = require('email-validator'); 
const empty = require('is-empty');

module.exports = function(passport) {

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({

		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},	

		function(req, email, pwd, done) {

			User.findOne({'email': email}, function(err, user){
				if(err) {
					console.log("1" + err);
					return done(err);
				}
				if(user) {
					console.log("user already exists" + (err));
					console.log(user);
					return done(null);
				}
				else {
					if((email_validator(email))===false || (empty(email))===false || (empty(password))===false)
						return done(null, 'enter proper credentials');
					var new_user = new User();
					new_user.email = email;
					new_user.password = new_user.generateHash(pwd);
					new_user.save(function(err) {
						if(err) throw err;
						console.log(new_user);
						return done(null, new_user);
					});
				}
			});

		}			
	));

	passport.use('local-login', new LocalStrategy({

		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
	},

		function(req, email, pwd, done) {
			User.findOne({'email': email}, function(err, user){
				if(err) {
					return done(err);
				}
				if(!user) {
					return done(null, false, {message: 'The user doesnt exist'});
				}
				if(!user.validPassword(pwd)) {
					return done(null, false, {message: 'wrong password added'});
				}
				return done(null, user);
			});
		}

	));
};