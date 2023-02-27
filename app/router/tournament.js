// Setup des routes
const express = require('express');
const tournamentController = require('../controllers/tournamentController');
const router = express.Router;

router.get('/', tournamentController.getAll);
router.get('/:id', tournamentController.getOne);

// CR.U.D.
router.post('/', tournamentController.create);
router.put('/:id', tournamentController.update);
router.delete('/:id', tournamentController.delete);

module.exports = router;