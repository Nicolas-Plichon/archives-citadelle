// Setup des routes
const express = require('express');
const gameController = require('../../controllers/gameController');
const router = express.Router();

router.get('/', gameController.getAll);
router.get('/:id', gameController.getOne);

// CR.U.D.
router.post('/', gameController.create);
router.put('/:id', gameController.update);
router.delete('/:id', gameController.delete);

module.exports = router;