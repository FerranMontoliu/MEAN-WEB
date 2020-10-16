const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');


module.exports.register = (request, response, next) => {
    var user = new User();

    user.isAdmin = request.body.username == 'admin';
    user.name = request.body.name;
    user.surname = request.body.surname;
    user.email = request.body.email;
    user.username = request.body.username;
    user.password = request.body.password;

    user.save((err, doc) => {
        if(!err) {
            response.send(doc);
        } else {
            if(err.code == 11000) {
                response.status(422).send(['The user is already registered']);
            } else {
                return next(err);
            }
        }
    });
}


module.exports.authenticate = (request, response, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err)
            return response.status(400).json(err);

        if(user)
            return response.status(200).json({"token": user.generateJWT()});
        
        return response.status(404).json(info);
    })(request, response);
}


module.exports.userProfile = (request, response, next) => {
    User.findOne({ _id: request._id },
        (err, user) => {
            if(!user)
                return response.status(404).json({status: false, message: 'User record not found'});
            
            return response.status(200).json({status: true, user: _.pick(user, ['name', 'surname', 'username', 'email'])});
        }
    );
}

module.exports.getUsers = (request, response, next) => {
    User.findOne({ _id: request._id, isAdmin: true },
        (err, admin) => {
            if(!admin)
                return response.status(404).json({status: false, message: 'You are not the administrator'});
            
            User.find({}, function(err, users) {
                var userMap = {};
        
                users.forEach(function(user) {
                    userMap[user._id] = _.pick(user, ['name', 'surname', 'username', 'email']);
                });
        
                return response.status(200).json({status: true, users: userMap});
            });
        }
    );
}

module.exports.deleteUser = (request, response, next) => {
    User.findOne({ _id: request._id, isAdmin: true },
        (err, admin) => {
            if(err)
                return response.status(404).json({status: false, message: 'Oooops...An error happened'});
            else if(!admin)
                return response.status(404).json({status: false, message: 'You are not the administrator'});
            else
                User.findOne({ username: request.body.userToDelete, isAdmin: true }, function(err, user) {
                    if(err)
                        return response.status(404).json({status: false, message: 'Oooops...An error happened'});
                    else if(!user) {
                        User.deleteOne({ username: request.body.userToDelete }, function(err) {
                            if(err)
                                return response.status(404).json({status: false, message: 'Oooops...An error happened'});
                            else
                                return response.status(200).json({status: false, message: 'User deleted successfully'});
                        });
                    } else
                        return response.status(404).json({status: false, message: 'You can\'t delete an administrator'});
                });
        }
    );
}