// Setup des routes
const express = require('express');
const router = express.Router();
const playerController = require('../../controllers/playerController');

router.get('/', playerController.getAll);
router.get('/:id', playerController.getOne);

// CR.U.D.
router.post('/', playerController.create);
router.put('/:id', playerController.update);
router.delete('/:id', playerController.delete);

module.exports = router;