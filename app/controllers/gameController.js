const {
    Game,
    Tournament,
    Type,
    Scenario,
    Ranking,
    Player,
    Faction,
    Commander
} = require("../models");

const { Op } = require('sequelize');


async function getAllGames() {
    const gamesList = await Game.findAll({
        attributes: ['id', 'date', 'ranking_before_a', 'ranking_a_change', 'ranking_after_a', 'ranking_before_b', 'ranking_b_change', 'ranking_after_b', 'result'],
        order: [['date', 'ASC']],
        include: [{
            model: Tournament,
            as: 'game_tournament',
            attributes: ['name'],
            include: [{
                model: Type,
                as: 'tournament_type',
                attributes: ['name']
            }]
        },{
            model: Scenario,
            as: 'game_scenario',
            attributes: ['name']
        }, {
            model: Ranking,
            as: 'game_ranking_a',
            attributes: ['ranking'],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['name']
            }, {
                model: Faction,
                as: 'ranking_faction',
                attributes: ['name']
            }]
        }, {
            model: Ranking,
            as: 'game_ranking_b',
            attributes: ['ranking'],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['name']
            }, {
                model: Faction,
                as: 'ranking_faction',
                attributes: ['name']
            }]
        },{
            model: Commander,
            as: 'game_commander_a',
            attributes: ['name']
        },{
            model: Commander,
            as: 'game_commander_b',
            attributes: ['name']
        }]
        });
    return gamesList;
};

async function getOnePlayerGames(playerId) {
    const gamesList = await Game.findAll({
        attributes: ['id', 'date', 'ranking_before_a', 'ranking_a_change', 'ranking_after_a', 'ranking_before_b', 'ranking_b_change', 'ranking_after_b', 'result'], 
    where: {
        [Op.or] : [
            {'$game_ranking_a.ranking_player.id$': playerId}, {'$game_ranking_b.ranking_player.id$' : playerId}
        ]
    }, 
    order: [['date', 'ASC']],    
    include: [{
            model: Tournament,
            as: 'game_tournament',
            attributes: ['name'],
            include: [{
                model: Type,
                as: 'tournament_type',
                attributes: ['name']
            }]
        },{
            model: Scenario,
            as: 'game_scenario',
            attributes: ['name']
        }, {
            model: Ranking,
            as: 'game_ranking_a',
            attributes: ['ranking'],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['id', 'name'],
            }, {
                model: Faction,
                as: 'ranking_faction',
                attributes: ['name']
            }]
        }, {
            model: Ranking,
            as: 'game_ranking_b',
            attributes: ['ranking'],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['id', 'name'],
            }, {
                model: Faction,
                as: 'ranking_faction',
                attributes: ['name']
            }]
        },{
            model: Commander,
            as: 'game_commander_a',
            attributes: ['name']
        },{
            model: Commander,
            as: 'game_commander_b',
            attributes: ['name']
        }]
        });

        console.log(JSON.stringify(gamesList[0], null, 2));
    return gamesList;
};

async function getOneTournamentGames(tournamentId) {
    const gamesList = await Game.findAll({
        attributes: ['id', 'date', 'ranking_before_a', 'ranking_a_change', 'ranking_after_a', 'ranking_before_b', 'ranking_b_change', 'ranking_after_b', 'result'],
        order: [['id', 'ASC']],
        include: [{
            model: Tournament,
            as: 'game_tournament',
            attributes: ['id', 'name'],
            where: { id: tournamentId },
            include: [{
                model: Type,
                as: 'tournament_type',
                attributes: ['name']
            }]
        },{
            model: Scenario,
            as: 'game_scenario',
            attributes: ['name']
        }, {
            model: Ranking,
            as: 'game_ranking_a',
            attributes: ['ranking'],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['name']
            }, {
                model: Faction,
                as: 'ranking_faction',
                attributes: ['name']
            }]
        }, {
            model: Ranking,
            as: 'game_ranking_b',
            attributes: ['ranking'],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['name']
            }, {
                model: Faction,
                as: 'ranking_faction',
                attributes: ['name']
            }]
        },{
            model: Commander,
            as: 'game_commander_a',
            attributes: ['name']
        },{
            model: Commander,
            as: 'game_commander_b',
            attributes: ['name']
        }]
        });
    return gamesList;
}

module.exports = {
    getAllGames,
    getOnePlayerGames,
    getOneTournamentGames
};