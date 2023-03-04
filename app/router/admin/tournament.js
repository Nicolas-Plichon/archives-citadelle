// Setup des routes
const express = require('express');
const router = express.Router();
const tournamentController = require('../../controllers/tournamentController');

router.get('/', tournamentController.all);
router.get('/:id', tournamentController.getOne);

// CR.U.D.
router.post('/', tournamentController.create);
router.put('/:id', tournamentController.update);
router.delete('/:id', tournamentController.delete);

module.exports = router;