// Setup
const express = require('express');
const typeController = require('../../controllers/typeController');
const router = express.Router();

router.get('/', typeController.getAll);
router.get('/:id', typeController.getOne);

// CR.U.D.
router.post('/', typeController.create);
router.put('/:id', typeController.update);
router.delete('/:id', typeController.delete);

module.exports = router;