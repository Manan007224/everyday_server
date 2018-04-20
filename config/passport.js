const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

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
		passwordField: 'password'
		passReqToCallBack: true
	},	

		function(req, email, pwd, done) {

			User.findOne({'email': email}, function(err, user){
				if(err) {
					return done(err);
				}
				if(user) {
					return done(null, false, {message: 'The user with this email already exists'});
				}
				else {
					new_user = {email: email, password: pwd}
					new_user.save(function(err) {
						if(err) throw err;
						return done(null, new_user);
					});
				}
			});

		}			
	));

	passport.use('local-login', new LocalStrategy({

		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
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