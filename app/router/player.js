// Setup des routes
const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');

router.get('/:id', playerController.getOnePlayer);


module.exports = router;