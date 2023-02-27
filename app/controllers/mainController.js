const { getAllFactions } = require("./factionController");
const { getAllGames, getOnePlayerGames, getOneTournamentGames } = require("./gameController");
const { getAllPlayers } = require("./playerController");
const { getAllRankings, getOneRanking, getOnePlayerRankings } = require("./rankingController");
const { getOpenTournaments, getClosedTournaments, countOfRounds } = require("./tournamentController");


const mainController = {

    async test(req, res) {
        const playerId = 1;
        try {
            const rankings = await getOnePlayerRankings(playerId);
            const games = await getOnePlayerGames(playerId);
            res.render('test', { playerId, rankings, games });
        } catch (err) {
            res.status(500).send(err.stack);
        }
    },

    homePage(req, res) {
        res.render('home');
    },

    // async pagePlayers(req, res) {
    //     try {
    //         const players = await getAllPlayers();
    //         res.render('players', {
    //             players
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },

    async pageOnePlayer(req, res) {
        const playerId = req.params.id;
        try {
            const rankings = await getOnePlayerRankings(playerId);
            const games = await getOnePlayerGames(playerId);
            res.render('player', { playerId, rankings, games });
        } catch (err) {
            res.status(500).send(err.stack);
        }
    },

    async pageRankings(req, res) {
        try {
            const rankings = await getAllRankings();
            const factions = await getAllFactions();
            res.render('rankings', {
                rankings,
                factions
            })
        } catch (err) {
            console.log(err);
        }
    },

    async pageOneRanking(req, res) {
        const factionName = req.params.faction;
        try {
            const rankings = await getOneRanking(factionName);
            const factions = await getAllFactions();
            res.render('rankings', {
                rankings,
                factions
            })
        } catch (err) {
            console.log(err);
        }
    },

    async pageTournaments(req, res) {
        try {
            const openTournaments = await getOpenTournaments();
            const closedTournaments = await getClosedTournaments();
            res.render('tournaments', {
                openTournaments,
                closedTournaments
            })
        } catch (err) {
            console.log(err)
        }
    },

    async pageOneTournament(req, res) {
        const tournamentId = req.params.id;
        try {
            const games = await getOneTournamentGames(tournamentId);
            const rounds = await countOfRounds(tournamentId);
            const count = rounds.count;
            const table = rounds.rows;
            res.render('tournamentGames', {
                games,
                count,
                table
            })
        } catch (err) {
            console.log(err)
        }
    },

    async pageGames(req, res) {
        try {
            const games = await getAllGames();
            res.render('games', {
                games
            })
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = mainController;