const express = require('express');
const factionController = require('../../controllers/factionController');
const router = express.Router();

router.get('/', factionController.getAll);
router.get('/:id', factionController.getOne);
router.post('/', factionController.create);
router.put('/:id', factionController.update);
router.delete('/:id', factionController.delete);

module.exports = router;