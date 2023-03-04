// Setup
const express = require('express');
const router = express.Router();

// Import des différents routers
const mainController = require('../controllers/mainController');
const playerRouter = require('./player');
const rankingRouter = require('./ranking');
const tournamentRouter = require('./tournament');
const adminRouter = require('./admin');
const maesterRouter = require('./maester');

// Route .get vers la homePage
router.get('/', mainController.homePage);

// Routes via les routers
router.use('/players', playerRouter);
router.use('/rankings', rankingRouter);
router.use('/tournaments', tournamentRouter);

// Routes admin et Mestre
router.use('/maester', maesterRouter);
router.use('/admin', adminRouter);


module.exports = router;