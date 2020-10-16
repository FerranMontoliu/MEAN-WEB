const mongoose = require('mongoose');


var incidenceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'You must enter a title'
    },
    description: {
        type: String,
        default: 'No description provided'
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    level: {
        type: String,
        required: 'You must choose a level'
    },
    state: {
        type: String,
        default: 'OPEN'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


// Validations
incidenceSchema.path('level').validate((val) => {
    return val == 'LOW' || val == 'MEDIUM' || val == 'HIGH';
}, 'Invalid level');

incidenceSchema.path('state').validate((val) => {
    return val == 'OPEN' || val == 'CLOSED';
}, 'Invalid state');


mongoose.model('Incidence', incidenceSchema, 'incidences');