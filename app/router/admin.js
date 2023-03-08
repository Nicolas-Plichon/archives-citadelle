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
const adminCommanderRouter = require('./admin/commander');
const adminRewardRouter = require('./admin/reward');
const adminVersionRouter = require('./admin/version');
const adminTypeRouter = require('./admin/type');
const adminScenarioRouter = require('./admin/scenario');
const adminStyleRouter = require('./admin/style');
const adminRoundRouter = require('./admin/round');
const adminRoleRouter = require('./admin/role');
const adminUserRouter = require('./admin/user');
const adminTrophyRouter = require('./admin/trophy');


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
router.use('/commanders', adminCommanderRouter);
router.use('/rewards', adminRewardRouter);
router.use('/versions', adminVersionRouter);
router.use('/types', adminTypeRouter);
router.use('/scenarios', adminScenarioRouter);
router.use('/styles', adminStyleRouter);
router.use('/rounds', adminRoundRouter);
router.use('/roles', adminRoleRouter);
router.use('/users', adminUserRouter);
router.use('/trophies', adminTrophyRouter);


module.exports = router;