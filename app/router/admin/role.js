// Setup
const express = require('express');
const roleController = require('../../controllers/roleController');
const router = express.Router();

router.get('/', roleController.getAll);
router.get('/:id', roleController.getOne);

// CR.U.D.
router.post('/', roleController.create);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;