const {
    Game,
    Tournament,
    Type,
    Scenario,
    Ranking,
    Player,
    Faction,
    Commander,
    Style,
    Version,
    Round,
    Country
} = require("../models");

const { Op } = require('sequelize');

const gameController = {

    async getAll(req, res) {
        try {
            const games = await Game.findAll();
            res.json(games)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const gameId = req.params.id;
            const games = await Game.findByPk(gameId);
            res.json(games);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { 
                round_id,
                ranking_a_id,
                commander_a_id,
                ranking_before_a,
                ranking_a_change,
                ranking_after_a,
                ranking_b_id,
                commander_b_id,
                ranking_before_b,
                ranking_b_change,
                ranking_after_b,
                result
            } = req.body;

            assert.ok(round_id, "Round is required");
            assert.ok(ranking_a_id, "Player A Ranking ID is required");
            assert.ok(ranking_before_a, "Player A Ranking Value is required");
            assert.ok(ranking_a_change, "Player A Ranking change is required");
            assert.ok(ranking_after_a, "New Player A Ranking is required");
            assert.ok(ranking_b_id, "Player A Ranking ID is required");
            assert.ok(ranking_before_b, "Player B Ranking Value is required");
            assert.ok(ranking_b_change, "Player B Ranking change is required");
            assert.ok(ranking_after_b, "New Player B Ranking is required");
            assert.ok(result, "Result is required");

            let newGame = await Game.create({
                round_id,
                ranking_a_id,
                commander_a_id,
                ranking_before_a,
                ranking_a_change,
                ranking_after_a,
                ranking_b_id,
                commander_b_id,
                ranking_before_b,
                ranking_b_change,
                ranking_after_b,
                result
            });
            res.json(newGame);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const gameId = req.params.id;
            const game = await Game.findByPk(gameId);

            if(game) {
                const { 
                    round_id,
                    ranking_a_id,
                    commander_a_id,
                    ranking_before_a,
                    ranking_a_change,
                    ranking_after_a,
                    ranking_b_id,
                    commander_b_id,
                    ranking_before_b,
                    ranking_b_change,
                    ranking_after_b,
                    result
                } = req.body;

                if(round_id) game.round_id = round_id;
                if(ranking_a_id) game.ranking_a_id = ranking_a_id;
                if(commander_a_id) game.commander_a_id = commander_a_id;
                if(ranking_before_a) game.ranking_before_a = ranking_before_a;
                if(ranking_a_change) game.ranking_a_change = ranking_a_change;
                if(ranking_after_a) game.ranking_after_a = ranking_after_a;
                if(ranking_b_id) game.ranking_b_id = ranking_b_id;
                if(commander_b_id) game.commander_b_id = commander_b_id;
                if(ranking_before_b) game.ranking_before_b = ranking_before_b;
                if(ranking_b_change) game.ranking_b_change = ranking_b_change;
                if(ranking_after_b) game.ranking_after_b = ranking_after_b;
                if(result) game.result = result;                

                await game.save();
                res.json(game)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const gameId = req.params.id;
            const game = await Game.findByPk(gameId);

            if(game) {
                await game.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    },

    // Vérifier ce qu'il faut garder / modifier
    async getAllGames() {
        const gamesList = await Game.findAll({
            attributes: ['id', 'ranking_before_a', 'ranking_a_change', 'ranking_after_a', 'ranking_before_b', 'ranking_b_change', 'ranking_after_b', 'result'],
            include: [{
                model: Round,
                as: 'game_round',
                attributes: ['id', 'date', 'position'],
                include: [{
                    model: Tournament,
                    as: 'round_tournament',
                    attributes: ['id', 'name', 'start_date', 'end_date', 'link', 'is_closed'],
                    include: [{
                        model: Type,
                        as: 'tournament_type',
                        attributes: ['id', 'name', 'color']
                    },{
                        model: Style,
                        as: 'tournament_style',
                        attributes: ['id', 'name', 'color']
                    },{
                        model: Version,
                        as: 'tournament_version',
                        attributes: ['id', 'name', 'color']
                    }]
                },{
                    model: Scenario,
                    as: 'round_scenario',
                    attributes: ['id', 'name']
                }]
            },{
                model: Ranking,
                as: 'game_ranking_a',
                attributes: ['ranking'],
                include: [{
                    model: Player,
                    as: 'ranking_player',
                    attributes: ['id', 'name'],
                    include: [{
                        model: Country,
                        as: 'player_country',
                        attributes: ['id', 'name']
                    }]
                }, {
                    model: Faction,
                    as: 'ranking_faction',
                    attributes: ['id', 'name','logo']
                }]
            }, {
                model: Ranking,
                as: 'game_ranking_b',
                attributes: ['ranking'],
                include: [{
                    model: Player,
                    as: 'ranking_player',
                    attributes: ['id', 'name'],
                    include: [{
                        model: Country,
                        as: 'player_country',
                        attributes: ['id', 'name']
                    }]
                }, {
                    model: Faction,
                    as: 'ranking_faction',
                    attributes: ['name','logo']
                }]
            },{
                model: Commander,
                as: 'game_commander_a',
                attributes: ['name', 'title']
            },{
                model: Commander,
                as: 'game_commander_b',
                attributes: ['name', 'title']
            }]
            });
        return gamesList;
    },
    
    async getOnePlayerGames(playerId) {
        const gamesList = await Game.findAll({
            attributes: ['id', 'ranking_before_a', 'ranking_a_change', 'ranking_after_a', 'ranking_before_b', 'ranking_b_change', 'ranking_after_b', 'result'],
            where: {
                [Op.or] : [
                    {'$game_ranking_a.ranking_player.id$': playerId}, {'$game_ranking_b.ranking_player.id$' : playerId}
                ]
        },   
        include: [{
            model: Round,
            as: 'game_round',
            attributes: ['id', 'date', 'position'],
            include: [{
                model: Tournament,
                as: 'round_tournament',
                attributes: ['id', 'name', 'start_date', 'end_date', 'link', 'is_closed'],
                include: [{
                    model: Type,
                    as: 'tournament_type',
                    attributes: ['id', 'name', 'color']
                },{
                    model: Style,
                    as: 'tournament_style',
                    attributes: ['id', 'name', 'color']
                },{
                    model: Version,
                    as: 'tournament_version',
                    attributes: ['id', 'name', 'color']
                }]
            },{
                model: Scenario,
                as: 'round_scenario',
                attributes: ['id', 'name']
            }]
        },{
            model: Ranking,
            as: 'game_ranking_a',
            attributes: ['ranking'],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['id', 'name'],
                include: [{
                    model: Country,
                    as: 'player_country',
                    attributes: ['id', 'name']
                }]
            }, {
                model: Faction,
                as: 'ranking_faction',
                attributes: ['id', 'name','logo']
            }]
        }, {
            model: Ranking,
            as: 'game_ranking_b',
            attributes: ['ranking'],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['id', 'name'],
                include: [{
                    model: Country,
                    as: 'player_country',
                    attributes: ['id', 'name']
                }]
            }, {
                model: Faction,
                as: 'ranking_faction',
                attributes: ['name','logo']
            }]
        },{
            model: Commander,
            as: 'game_commander_a',
            attributes: ['name', 'title']
        },{
            model: Commander,
            as: 'game_commander_b',
            attributes: ['name', 'title']
        }]
        });
    return gamesList;
    },
    
    async getOneTournamentGames(tournamentId) {
        const gamesList = await Game.findAll({
            attributes: ['id', 'ranking_before_a', 'ranking_a_change', 'ranking_after_a', 'ranking_before_b', 'ranking_b_change', 'ranking_after_b', 'result'],
            where: {'$game_round.round_tournament.id$': tournamentId},
            include: [{
                model: Round,
                as: 'game_round',
                attributes: ['id', 'date', 'position'],
                include: [{
                    model: Tournament,
                    as: 'round_tournament',
                    attributes: ['id', 'name', 'start_date', 'end_date', 'link', 'is_closed'],
                    include: [{
                        model: Type,
                        as: 'tournament_type',
                        attributes: ['id', 'name', 'color']
                    },{
                        model: Style,
                        as: 'tournament_style',
                        attributes: ['id', 'name', 'color']
                    },{
                        model: Version,
                        as: 'tournament_version',
                        attributes: ['id', 'name', 'color']
                    }]
                },{
                    model: Scenario,
                    as: 'round_scenario',
                    attributes: ['id', 'name']
                }]
            },{
                model: Ranking,
                as: 'game_ranking_a',
                attributes: ['ranking'],
                include: [{
                    model: Player,
                    as: 'ranking_player',
                    attributes: ['id', 'name'],
                    include: [{
                        model: Country,
                        as: 'player_country',
                        attributes: ['id', 'name']
                    }]
                }, {
                    model: Faction,
                    as: 'ranking_faction',
                    attributes: ['id', 'name','logo']
                }]
            }, {
                model: Ranking,
                as: 'game_ranking_b',
                attributes: ['ranking'],
                include: [{
                    model: Player,
                    as: 'ranking_player',
                    attributes: ['id', 'name'],
                    include: [{
                        model: Country,
                        as: 'player_country',
                        attributes: ['id', 'name']
                    }]
                }, {
                    model: Faction,
                    as: 'ranking_faction',
                    attributes: ['name','logo']
                }]
            },{
                model: Commander,
                as: 'game_commander_a',
                attributes: ['name', 'title']
            },{
                model: Commander,
                as: 'game_commander_b',
                attributes: ['name', 'title']
            }]
            });
        return gamesList;
    }

}


module.exports = gameController;