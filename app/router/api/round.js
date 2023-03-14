const express = require('express');
const roundController = require('../../controllers/roundController');
const router = express.Router();

router.get('/', roundController.getAll);
router.get('/:id', roundController.getOne);
router.post('/', roundController.create);
router.put('/:id', roundController.update);
router.delete('/:id', roundController.delete);

module.exports = router;