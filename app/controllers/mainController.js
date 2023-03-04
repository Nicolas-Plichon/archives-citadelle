const gameController = require('./gameController');
const tournamentController = require('./tournamentController');


const mainController = {

    homePage(req, res) {
        res.render('home');
    },

    maesterHomePage(req, res) {
        res.render('home');
    },

    adminHomePage(req, res) {
        res.render('home');
    },

    

    

    async pageGames(req, res) {
        try {
            const games = await gameController.getAllGames();
            res.render('games', {
                games
            })
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = mainController;