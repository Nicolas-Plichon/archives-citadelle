const {
    Faction
} = require('../models');


async function getAllFactions() {
    const factionList = await Faction.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']]
    });
    return factionList;
};


module.exports = {
    getAllFactions
};