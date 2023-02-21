const {
    Tournament,
    Type
} = require('../models');


async function getOpenTournaments() {
    const tournamentList = await Tournament.findAll({
        attributes: ['id', 'name', 'date', 'link', 'is_closed'],
        where: { is_closed: false},
        order: [['date', 'ASC']],
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
        attributes: ['id', 'name', 'date', 'link', 'is_closed'],
        where: { is_closed: true},
        order: [['date', 'ASC']],
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