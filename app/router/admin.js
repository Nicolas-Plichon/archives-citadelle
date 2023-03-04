// Setup des routes
const express = require('express');
const router = express.Router();

// Import des différents routers
const adminPlayerRouter = require('./admin/player');
const adminRankingRouter = require('./admin/ranking');
const adminTournamentRouter = require('./admin/tournament');
const adminGameRouter = require('./admin/game');
const adminFactionRouter = require('./admin/faction');
const adminCountryRouter = require('./admin/country');

// Import des controllers
const mainController = require('../controllers/mainController');

// Route home Admin
router.get('/', mainController.adminHomePage);

// Routes via les routers
router.use('/players', adminPlayerRouter);
router.use('/rankings', adminRankingRouter);
router.use('/tournaments', adminTournamentRouter);
router.use('/games', adminGameRouter);
router.use('/factions', adminFactionRouter);
router.use('/countries', adminCountryRouter);


module.exports = router;



