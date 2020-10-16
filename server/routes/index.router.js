const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlIncidence = require('../controllers/incidence.controller');
const jwtHelper = require('../config/jwtHelper');

// REGISTER AND LOGIN
router.post('/register', ctrlUser.register);
router.post('/auth', ctrlUser.authenticate);

// PROFILE
router.get('/profile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

// INCIDENCES
router.get('/incidences', jwtHelper.verifyJwtToken, ctrlIncidence.getIncidences);
router.get('/my-incidences', jwtHelper.verifyJwtToken, ctrlIncidence.getOwnIncidences);
router.post('/get-incidence-by-id', jwtHelper.verifyJwtToken, ctrlIncidence.getIncidenceById);
router.post('/add-incidence', jwtHelper.verifyJwtToken, ctrlIncidence.registerIncidence);
router.put('/edit-incidence', jwtHelper.verifyJwtToken, ctrlIncidence.updateIncidence);

// USERS
router.get('/userlist', jwtHelper.verifyJwtToken, ctrlUser.getUsers);
router.delete('/delete-user', jwtHelper.verifyJwtToken, ctrlUser.deleteUser);

module.exports = router;