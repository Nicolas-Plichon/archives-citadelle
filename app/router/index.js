// Setup des routes
const express = require('express');
const router = express.Router();

// Import des différents routers
const playerRouter = require('./player');
const rankingRouter = require('./ranking');
const tournamentRouter = require('./tournament');
const gameRouter = require('./game');
const factionRouter = require('./faction');
const countryRouter = require('./country');

// Route via les routers
router.use('/players', playerRouter);
router.use('/rankings', rankingRouter);
router.use('/tournaments', tournamentRouter);
router.use('/games', gameRouter);
router.use('/factions', factionRouter);
router.use('/countries', countryRouter);

// Route pour les tests
// const testRouter = require('./test');

module.exports = router;