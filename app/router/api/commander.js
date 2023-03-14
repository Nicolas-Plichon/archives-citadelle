const express = require('express');
const commanderController = require('../../controllers/commanderController');
const router = express.Router();

router.get('/', commanderController.getAll);
router.get('/:id', commanderController.getOne);
router.post('/', commanderController.create);
router.put('/:id', commanderController.update);
router.delete('/:id', commanderController.delete);

module.exports = router