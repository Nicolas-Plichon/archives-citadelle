// Setup des routes
const express = require('express');
const router = express.Router();
const rankingController = require('../../controllers/rankingController');

router.get('/', rankingController.getAll);
router.get('/:id', rankingController.getOne);
router.post('/', rankingController.create);
router.put('/:id', rankingController.update);
router.delete('/:id', rankingController.delete);


module.exports = router;