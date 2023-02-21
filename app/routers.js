const express = require('express');
const mainController = require('./controllers/mainController');

const router = express.Router();

router.get('/', mainController.homePage);

router.get('/players', mainController.pagePlayers);
router.get('/rankings', mainController.pageRankings);
router.get('/tournaments', mainController.pageTournaments);
router.get('/games', mainController.pageGames);

router.get('/factions/:faction', mainController.pageOneRanking);
router.get('/players/:id', mainController.pageOnePlayer);
router.get('/tournaments/:id', mainController.pageOneTournament);

module.exports = router;

/*
router.get('/game', controller.pageGames);

router.get('/faction/:id', controller.getFaction);
router.get('/player/:playerId', controller.getOnePlayer);
router.get('/tournament/:tournamentId', controller.getOneTournament);
*/