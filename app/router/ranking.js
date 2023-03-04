// Setup des routes
const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/rankingController');

router.get('/', rankingController.all);
router.get('/:faction', rankingController.OneFaction);
router.get('/:type', rankingController.OneType);
router.get('/:faction/:type', rankingController.OneFactionOneType);
router.get('/:country', rankingController.OneCountryRankings);
router.get('/:country/:faction', rankingController.OneCountryOneFaction);
router.get('/:country/:type', rankingController.OneCountryOneType);
router.get('/:country/:faction/:type', rankingController.OneCountryOneFactionOneType);


module.exports = router;