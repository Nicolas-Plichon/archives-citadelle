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


async function getAllGames() {
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
};

async function getOnePlayerGames(playerId) {
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
};

async function getOneTournamentGames(tournamentId) {
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
};

module.exports = {
    getAllGames,
    getOnePlayerGames,
    getOneTournamentGames,
};