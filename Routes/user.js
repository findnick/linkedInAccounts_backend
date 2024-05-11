const express = require('express');
const routes = express.Router();

const { Register, Login, AllUserData } = require('../Controllres/user');


// @POST USER REGISTRATION
routes.post('/register', Register)
routes.post('/login', Login)

// Get
routes.get('/', AllUserData)

module.exports = routes;