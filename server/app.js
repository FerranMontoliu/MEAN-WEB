require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const routesIndex = require('./routes/index.router');

var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', routesIndex);

// Error handle
app.use((err, request, response, next) => {
    if(err.name == 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        response.status(422).send(valErrors);
    }
});

// Server listener
app.listen(process.env.PORT,
    () => console.log(`[Server] Server started at port: ${process.env.PORT}`));