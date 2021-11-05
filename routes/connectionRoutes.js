const express = require('express');
const controller = require('../controllers/connectionController');
const{validateId} = require('../middlewares/validator');

const router = express.Router();

//GET /connections/new: send html form for creating a new connection
router.get('/newConnection', controller.newConnection);

//GET connections page
router.get('/', controller.index);

//POST /connections: create a new connection
router.post('/', controller.create);

//GET /connections/:id: send details of connection identified by id
router.get('/:id', validateId, controller.show);

//GET /connections/:id/edit: send html form for editing an exising connection
router.get('/:id/edit',validateId, controller.edit);

//PUT /connections/:id: update the connection identified by id
router.put('/:id', validateId, controller.update);

//DELETE /connections/:id, delete the connection identified by id
router.delete('/:id', validateId, controller.delete);

module.exports = router;