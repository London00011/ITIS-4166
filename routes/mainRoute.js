const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//GET /connections: send all connections to the user
router.get('/', controller.index);

//GET about page
router.get('/about', controller.about);

//GET connections page
router.get('/connections', controller.connections);

//GET contact page
router.get('/contact', controller.contact);

//GET error page
router.get('/error', controller.error);

//GET connections page
router.get('/index', controller.index);