const {
    Ranking,
    Player,
    Faction,
    Type
} = require('../models');


// Liste des Rankings, dans l'ordre décroissant
async function getAllRankings() {
    const rankingList = await Ranking.findAll({
        attributes: ['id', 'ranking'],
        order: [['ranking', 'DESC']],
        include: [{
            model: Player,
            as: 'ranking_player',
            attributes: ['id', 'name']
        }, {
            model: Faction,
            as: 'ranking_faction',
            attributes: ['name']
        }, {
            model: Type,
            as: 'ranking_type',
            attributes: ['name']
        }]
    });
    return rankingList;
};

async function getOneRanking(factionName) {
    const rankingList = await Ranking.findAll({
        attributes: ['id', 'ranking'],
        order: [['ranking', 'DESC']],
        include: [{
            model: Player,
            as: 'ranking_player',
            attributes: ['id', 'name']
        }, {
            model: Faction,
            as: 'ranking_faction',
            attributes: ['name'],
            where: {name: factionName}
        }, {
            model: Type,
            as: 'ranking_type',
            attributes: ['name']
        }]
    });
    return rankingList;
};

async function getOnePlayerRankings(playerId) {
    const rankingList = await Ranking.findAll({
        attributes: ['id', 'ranking'],
        order: [['ranking', 'DESC']],
        include: [{
            model: Player,
            as: 'ranking_player',
            attributes: ['id', 'name'],
            where: { id: playerId },
        }, {
            model: Faction,
            as: 'ranking_faction',
            attributes: ['name'],
        }, {
            model: Type,
            as: 'ranking_type',
            attributes: ['name']
        }]
    });
    return rankingList;
};


module.exports = {
    getAllRankings,
    getOneRanking,
    getOnePlayerRankings
};