// Setup
const express = require('express');
const styleController = require('../../controllers/styleController');
const router = express.Router();

router.get('/', styleController.getAll);
router.get('/:id', styleController.getOne);

// CR.U.D.
router.post('/', styleController.create);
router.put('/:id', styleController.update);
router.delete('/:id', styleController.delete);

module.exports = router;