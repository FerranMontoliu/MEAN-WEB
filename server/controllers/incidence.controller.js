const { response } = require('express');
const mongoose = require('mongoose');

const Incidence = mongoose.model('Incidence');
const User = mongoose.model('User');


module.exports.registerIncidence = (request, response, next) => {
    var incidence = new Incidence();

    incidence.title = request.body.title;
    incidence.description = request.body.description;
    incidence.level = request.body.level;
    incidence.creator = request._id;

    incidence.save((err, doc) => {
        if(!err)
            response.send(doc);
        else
            return next(err);
    });
}

module.exports.getIncidenceById = (request, response, next) => {
    Incidence.findOne({ _id: request.body.incidenceId },
    (err, incidence) => {
        if(!incidence)
            return response.status(404).json({status: false, message: 'Incidence record not found'});
        
        return response.status(200).json({status: true, incidence: incidence});
    });
}

module.exports.getIncidences = (request, response, next) => {
    Incidence.find({}, function(err, incidences) {
        var incidenceMap = {};

        incidences.forEach(function(inc) {
            incidenceMap[inc._id] = inc;
        });

        return response.status(200).json({status: true, incidences: incidenceMap});
    });
}

module.exports.getOwnIncidences = (request, response, next) => {
    User.findOne({ _id: request._id, isAdmin: true },
        (err, admin) => {
            if(!admin) {
                Incidence.find({creator: request._id }, function(err, incidences) {
                    var incidenceMap = {};
            
                    incidences.forEach(function(inc) {
                        incidenceMap[inc._id] = inc;
                    });
            
                    return response.status(200).json({status: true, incidences: incidenceMap});
                });
            } else {
                Incidence.find({}, function(err, incidences) {
                    var incidenceMap = {};
            
                    incidences.forEach(function(inc) {
                        incidenceMap[inc._id] = inc;
                    });
            
                    return response.status(200).json({status: true, incidences: incidenceMap});
                });
            }
        }
    );
}

module.exports.updateIncidence = (request, response, next) => {
    User.findOne({ _id: request._id },
        (err, user) => {
            if(!user)
                return response.status(404).json({status: false, message: 'User record not found'});
            else
                Incidence.findOne({ _id: request.body._id },
                    (err, incidence) => {
                        if(!incidence)
                            return response.status(404).json({status: false, message: 'Incidence record not found'});
                        else if(incidence.creator.toString() == user._id.toString() || user.isAdmin)
                            Incidence.updateOne({ _id: request.body._id }, {$set: {
                                title: request.body.title,
                                description: request.body.description,
                                updateDate: Date.now(),
                                level: request.body.level,
                                state: request.body.state
                            }},
                            (err, raw) => {
                                return response.status(200).json({status: true});
                            });
                        else
                            return response.status(404).json({status: false, message: 'You are not the owner of this incidence'});
                    }
                );
        }
    );
}