const {
    Tournament,
    Type,
    Round,
    Scenario,
    Style,
    Version
} = require('../models');

const { Op } = require('sequelize');


async function getOpenTournaments() {
    const tournamentList = await Tournament.findAll({
        attributes: ['id', 'name', 'start_date', 'link', 'is_closed'],
        where: { is_closed: false},
        order: [['start_date', 'ASC']],
        include: [{
            model: Type,
            as: 'tournament_type',
            attributes: ['name']
        }]
    });
    return tournamentList;
};

async function getClosedTournaments() {
    const tournamentList = await Tournament.findAll({
        attributes: ['id', 'name', 'start_date', 'link', 'is_closed'],
        where: { is_closed: true},
        order: [['start_date', 'ASC']],
        include: [{
            model: Type,
            as: 'tournament_type',
            attributes: ['name']
        }]
    });
    return tournamentList;
};

async function countOfRounds(tournamentId) {
    const { count, rows } = await Round.findAndCountAll({
        attributes: ['id', 'date', 'position'],
        where: {'$round_tournament.id$': tournamentId},
        order: [['position', 'ASC']],
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
    })
    return { count, rows };
};


module.exports = {
    getOpenTournaments,
    getClosedTournaments, 
    countOfRounds
};