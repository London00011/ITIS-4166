const express = require('express');
const controller = require('../controllers/mainController');
const connectionRoutes = require('./connectionRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

//GET /connections: send all connections to the user
router.get('/', controller.index);

//GET about page
router.get('/about', controller.about);

//GET contact page
router.get('/contact', controller.contact);

//GET error page
router.get('/error', controller.error);

//GET connections page
router.get('/index', controller.index);

router.use('/connections', connectionRoutes);

router.use('/user', userRoutes);

module.exports = router;