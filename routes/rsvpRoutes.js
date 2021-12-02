const express = require('express');
const controller = require('../controllers/rsvpController');
const { isLoggedIn } = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');
const router = express.Router();

router.post('/:id', validateId, isLoggedIn, controller.create);

module.exports = router;