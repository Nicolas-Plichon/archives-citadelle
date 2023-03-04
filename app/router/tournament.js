// Setup des routes
const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');

router.get('/', tournamentController.all);
router.get('/open', tournamentController.allOpen);
router.get('/close', tournamentController.allClosed);
router.get('/:country', tournamentController.allFromCountry);
router.get('/:country/open', tournamentController.allOpenFromCountry);
router.get('/:country/closed', tournamentController.allClosedFromCountry);
router.get('/:id', tournamentController.one);

module.exports = router;