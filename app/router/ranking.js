// Setup des routes
const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/rankingController');

router.get('/', rankingController.all);
router.get('/faction/:faction', rankingController.OneFaction);
router.get('/type/:type', rankingController.OneType);
router.get('/faction/:faction/type/:type', rankingController.OneFactionOneType);
router.get('/country/:country', rankingController.OneCountry);
router.get('/country/:country/faction/:faction', rankingController.OneCountryOneFaction);
router.get('/country/:country/type/:type', rankingController.OneCountryOneType);
router.get('/country/:country/faction/:faction/type/:type', rankingController.OneCountryOneFactionOneType);


module.exports = router;