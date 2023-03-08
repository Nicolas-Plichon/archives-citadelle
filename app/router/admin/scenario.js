// Setup
const express = require('express');
const scenarioController = require('../../controllers/scenarioController');
const router = express.Router();

router.get('/', scenarioController.getAll);
router.get('/:id', scenarioController.getOne);

// CR.U.D.
router.post('/', scenarioController.create);
router.put('/:id', scenarioController.update);
router.delete('/:id', scenarioController.delete);

module.exports = router;