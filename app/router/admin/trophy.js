// Setup
const express = require('express');
const trophyController = require('../../controllers/trophyController');
const router = express.Router();

router.get('/', trophyController.getAll);
router.get('/:id', trophyController.getOne);

// CR.U.D.
router.post('/', trophyController.create);
router.put('/:id', trophyController.update);
router.delete('/:id', trophyController.delete);

module.exports = router;