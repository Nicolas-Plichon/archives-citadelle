// Setup
const express = require('express');
const rewardController = require('../../controllers/rewardController');
const router = express.Router();

router.get('/', rewardController.getAll);
router.get('/:id', rewardController.getOne);

// CR.U.D.
router.post('/', rewardController.create);
router.put('/:id', rewardController.update);
router.delete('/:id', rewardController.delete);

module.exports = router;