const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    isAdmin: Boolean,
    name: {
        type: String,
        required: 'Name can\'t be empty'
    },
    surname: {
        type: String,
        required: 'Surname can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    username: {
        type: String,
        required: 'Username can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty'
    },
    saltSecret: String
});


// Validations
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid email');

userSchema.path('password').validate((val) => {
    passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(val);
}, 'Invalid password');

userSchema.path('username').validate((val) => {
    usernameRegex = /^[^@]+$/;
    return usernameRegex.test(val);
}, 'The username can\'t contain the character \'@\'');


// Hash and salt
userSchema.pre('save',function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function() {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXP }
    );
}


mongoose.model('User', userSchema, 'users');