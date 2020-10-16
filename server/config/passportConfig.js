const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');


passport.use(
    new localStrategy({usernameField: 'username'},
    (name, password, done) => {
        User.findOne({username: name},
            (err, user) => {
                if(err)
                    return done(err);

                if(!user)
                    return done(null, false, {message: 'Incorrect username or password.'});

                if(!user.verifyPassword(password))
                    return done(null, false, {message: 'Incorrect username or password.'});

                return done(null, user);
            });
    })
);