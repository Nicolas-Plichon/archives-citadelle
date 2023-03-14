const express = require('express');
const versionController = require('../../controllers/versionController');
const router = express.Router();

router.get('/', versionController.getAll);
router.get('/:id', versionController.getOne);
router.post('/', versionController.create);
router.put('/:id', versionController.update);
router.delete('/:id', versionController.delete);

module.exports = router;