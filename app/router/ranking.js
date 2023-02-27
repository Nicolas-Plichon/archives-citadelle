// Setup des routes
const express = require('express');
const rankingController = require('../controllers/rankingController');
const router = express.Router;

router.get('/', rankingController.getAll);
router.get('/:id', rankingController.getOne);

// CR.U.D.
router.post('/', rankingController.create);
router.put('/:id', rankingController.update);
router.delete('/:id', rankingController.delete);

module.exports = router;