const {
    Tournament,
    Type
} = require('../models');


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


module.exports = {
    getOpenTournaments,
    getClosedTournaments
};