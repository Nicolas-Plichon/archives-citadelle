const {
    Player,
    Country
} = require('../models');

async function getAllPlayers() {
    const playerList = await Player.findAll({
        attributes: ['id', 'name'],
        include: {
            model: Country,
            as: 'player_country',
            attributes: ['name']
        }
    });
    return playerList;
};


module.exports = {
    getAllPlayers
};