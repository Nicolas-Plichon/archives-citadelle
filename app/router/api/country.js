const express = require('express');
const countryController = require('../../controllers/countryController');
const router = express.Router();

router.get('/', countryController.getAll);
router.get('/:id', countryController.getOne);
router.post('/', countryController.create);
router.put('/:id', countryController.update);
router.delete('/:id', countryController.delete);

module.exports = router;