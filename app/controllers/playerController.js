const assert = require('assert');
const {
    Player,
    Country
} = require('../models');

// Controllers
const gameController = require('./gameController');
const rankingController = require('./rankingController');


const playerController = {
    
     async getAll(req, res) {
        try {
            const playersList = await Player.findAll({
                attributes: ['id', 'name'],
                include: {
                    model: Country,
                    as: 'player_country',
                    attributes: ['name']
                }
            });
            res.render('players', {
                players : playersList
            })
        } catch (err) {
            console.log(err)
        }
    },

    async getOnePlayer(req, res) {
        const playerId = req.params.id;
        try {
            const player = await playerController.getOne(playerId);
            const rankings = await rankingController.getOnePlayerRankings(playerId);
            const games = await gameController.getOnePlayerGames(playerId);
            res.render('player', { playerId, player, rankings, games });
        } catch (err) {
            res.status(500).send(err.stack);
        }
    },

    async getOne(req, res) {
        try {
            const playerId = req.params.id;
            const player = await Player.findByPk(playerId, {
                attributes: ['id', 'name'],
                include: {
                    model: Country,
                    as: 'player_country',
                    attributes: ['name']
                }
            });
            return player;
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { name, country_id } = req.body;
            assert.ok(name, "Name is required");
            assert.ok(country_id, "Country is required");
            let newPlayer = await Player.create({
                name, country_id
            });
            res.json(newPlayer);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const playerId = req.params.id;
            const player = await Player.findByPk(playerId);

            if(player) {
                const { name, country_id } = req.body;
                if(name) player.name = name;
                if(country_id) player.country_id = country_id;

                await player.save();
                res.json(player)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const playerId = req.params.id;
            const player = await Player.findByPk(playerId);

            if(player) {
                await player.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

};

module.exports = playerController;