const express = require('express');
const controller = require('../controllers/connectionController');
const { isLoggedIn, isNotCreator } = require('../middlewares/auth');
const{validateId} = require('../middlewares/validator');
const rsvpRoutes = require('./rsvpRoutes');

const router = express.Router();

//GET /connections/new: send html form for creating a new connection
router.get('/newConnection', isLoggedIn, controller.newConnection);

//GET connections page
router.get('/', controller.index);

//POST /connections: create a new connection
router.post('/', isLoggedIn, controller.create);

//GET /connections/:id: send details of connection identified by id
router.get('/:id', validateId, controller.show);

//GET /connections/:id/edit: send html form for editing an exising connection
router.get('/:id/edit', validateId, isLoggedIn, controller.edit);

//PUT /connections/:id: update the connection identified by id
router.put('/:id', validateId, isLoggedIn, controller.update);

//DELETE /connections/:id, delete the connection identified by id
router.delete('/:id', validateId, isLoggedIn, controller.delete);

router.post('/:id/rsvp', validateId, isLoggedIn, isNotCreator, controller.editRsvp);

router.delete('/:id/rsvp', validateId, isLoggedIn, controller.deleteRsvp);

module.exports = router;