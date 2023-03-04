// Setup des routes
const express = require('express');
const router = express.Router();

// Import des différents routers
const maesterPlayerRouter = require('./admin/player');
const maesterRankingRouter = require('./admin/ranking');
const maesterTournamentRouter = require('./admin/tournament');
const maesterGameRouter = require('./admin/game');

// Import des controllers
const mainController = require('../controllers/mainController');

// Route home Maester
router.get('/', mainController.maesterHomePage);

// Routes via les routers
router.use('/players', maesterPlayerRouter);
router.use('/rankings', maesterRankingRouter);
router.use('/tournaments', maesterTournamentRouter);
router.use('/games', maesterGameRouter);


module.exports = router;



