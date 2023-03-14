// Setup
const express = require('express');
const router = express.Router();

// Import des différents routers
const commanderRouter = require('./api/commander');
const countryRouter = require('./api/country');
const factionRouter = require('./api/faction');
const gameRouter = require('./api/game');
const playerRouter = require('./api/player');
const rankingRouter = require('./api/ranking');
const rewardRouter = require('./api/reward');
const roleRouter = require('./api/role');
const roundRouter = require('./api/round');
const scenarioRouter = require('./api/scenario');
const styleRouter = require('./api/style');
const tournamentRouter = require('./api/tournament');
const trophyRouter = require('./api/trophy');
const typeRouter = require('./api/type');
const userRouter = require('./api/user');
const versionRouter = require('./api/version');

// Routes via les routers
router.use('/commanders', commanderRouter);
router.use('/countries', countryRouter);
router.use('/factions', factionRouter);
router.use('/games', gameRouter);
router.use('/players', playerRouter);
router.use('/rankings', rankingRouter);
router.use('/rewards', rewardRouter);
router.use('/roles', roleRouter);
router.use('/rounds', roundRouter);
router.use('/scenarios', scenarioRouter);
router.use('/styles', styleRouter);
router.use('/tournaments', tournamentRouter);
router.use('/trophies', trophyRouter);
router.use('/types', typeRouter);
router.use('/users', userRouter);
router.use('/versions', versionRouter);

module.exports = router;