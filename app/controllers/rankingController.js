const assert = require('assert');
const {
    Ranking,
    Player,
    Faction,
    Type,
    Country
} = require('../models');

// Controllers
const factionController = require('./factionController');


const rankingController = {

    async allFactions(req, res) {
        try {
            const rankingList = await Ranking.findAll({
                attributes: ['id', 'ranking'],
                order: [['ranking', 'DESC']],
                include: [{
                    model: Player,
                    as: 'ranking_player',
                    attributes: ['id', 'name'],
                    include: {
                        model: Country,
                        as: 'player_country',
                        attributes: ['name']
                    }
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
            res.json(rankingList)
        } catch (err) {
            console.log(err)
        }
    },

    async OneFaction(req, res) {
        const factionName = req.params.faction;
        try {
            const rankings = await rankingController.getOneFactionRanking(factionName);
            const factions = await factionController.getAll();
            res.render('rankings', {
                rankings,
                factions
            })
        } catch (err) {
            console.log(err);
        }
    },

    async OneType(req, res) {
        const typeName = req.params.type;
        try {
            const rankings = await rankingController.getOneType(typeName);
            const factions = await factionController.getAll();
            res.render('rankings', {
                rankings,
                factions
            })
        } catch (err) {
            console.log(err);
        }
    },

    async OneFactionOneType(req, res) {
        const factionName = req.params.faction;
        const typeName = req.params.type;
        try {
            const rankings = await rankingController.getOneFactionOneType(factionName, typeName);
            const factions = await factionController.getAll();
            res.render('rankings', {
                rankings,
                factions
            })
        } catch (err) {
            console.log(err);
        }
    },

    async OneCountry(req, res) {
        const countryName = req.params.country;
        try {
            const rankings = await rankingController.getOneCountry(countryName);
            const factions = await factionController.getAll();
            res.render('rankings', {
                rankings,
                factions
            })
        } catch (err) {
            console.log(err);
        }
    },

    async OneCountryOneFaction(req, res) {
        const countryName = req.params.country;
        const factionName = req.params.faction;
        try {
            const rankings = await rankingController.getOneCountryOneFaction(countryName, factionName);
            const factions = await factionController.getAll();
            res.render('rankings', {
                rankings,
                factions
            })
        } catch (err) {
            console.log(err);
        }
    },

    async OneCountryOneType(req, res) {
        const countryName = req.params.country;
        const typeName = req.params.type;
        try {
            const rankings = await rankingController.getOneCountryOneType(countryName, typeName);
            const factions = await factionController.getAll();
            res.render('rankings', {
                rankings,
                factions
            })
        } catch (err) {
            console.log(err);
        }
    },

    async OneCountryOneFactionOneType(req, res) {
        const countryName = req.params.country;
        const factionName = req.params.faction;
        const typeName = req.params.type;
        try {
            const rankings = await rankingController.getOneCountryOneFactionOneType(countryName, factionName, typeName);
            const factions = await factionController.getAll();
            res.render('rankings', {
                rankings,
                factions
            })
        } catch (err) {
            console.log(err);
        }
    },

    async getOnePlayer(playerId) {
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
    },

    async getOnePlayerRankings(playerId) {
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
    },

    async getOneFactionRanking(factionName) {
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
    },

    async getOneType(typeName) {
        const rankingList = await Ranking.findAll({
            attributes: ['id', 'ranking'],
            order: [['ranking', 'DESC']],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['id', 'name'],
                include: {
                    model: Country,
                    as: 'player_country',
                    attributes: ['name']
                }
            }, {
                model: Faction,
                as: 'ranking_faction',
                attributes: ['name']
            }, {
                model: Type,
                as: 'ranking_type',
                where: {name: typeName},
                attributes: ['name']
            }]
        });
        return rankingList;
    },

    // Les rankings d'un tri faction / Type
    async getOneFactionOneType(factionName, typeName) {
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
                where: {name: typeName},
                attributes: ['name']
            }]
        });
        return rankingList;
    },

    async getOneCountry(countryName) {
        const rankingList = await Ranking.findAll({
            attributes: ['id', 'ranking'],
            order: [['ranking', 'DESC']],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['id', 'name'],
                include: {
                    model: Country,
                    as: 'player_country',
                    where: {name: countryName},
                    attributes: ['name']
                }
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
    },

    async getOneCountryOneFaction(countryName, factionName) {
        const rankingList = await Ranking.findAll({
            attributes: ['id', 'ranking'],
            order: [['ranking', 'DESC']],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['id', 'name'],
                include: {
                    model: Country,
                    as: 'player_country',
                    where: {name: countryName},
                    attributes: ['name']
                }
            }, {
                model: Faction,
                as: 'ranking_faction',
                where: {name: factionName},
                attributes: ['name']
            }, {
                model: Type,
                as: 'ranking_type',
                attributes: ['name']
            }]
        });
        return rankingList;
    },

    async getOneCountryOneType(countryName, typeName) {
        const rankingList = await Ranking.findAll({
            attributes: ['id', 'ranking'],
            order: [['ranking', 'DESC']],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['id', 'name'],
                include: {
                    model: Country,
                    as: 'player_country',
                    where: {name: countryName},
                    attributes: ['name']
                }
            }, {
                model: Faction,
                as: 'ranking_faction',
                attributes: ['name']
            }, {
                model: Type,
                as: 'ranking_type',
                where: {name: typeName},
                attributes: ['name']
            }]
        });
        return rankingList;
    },

    async getOneCountryOneFactionOneType(countryName, factionName, typeName) {
        const rankingList = await Ranking.findAll({
            attributes: ['id', 'ranking'],
            order: [['ranking', 'DESC']],
            include: [{
                model: Player,
                as: 'ranking_player',
                attributes: ['id', 'name'],
                include: {
                    model: Country,
                    as: 'player_country',
                    where: {name: countryName},
                    attributes: ['name']
                }
            }, {
                model: Faction,
                as: 'ranking_faction',
                where: {name: factionName},
                attributes: ['name']
            }, {
                model: Type,
                as: 'ranking_type',
                where: {name: typeName},
                attributes: ['name']
            }]
        });
        return rankingList;
    },

    // CRUD 
    async getAll(req, res) {
        try {
            const rankings = await Ranking.findAll();
            res.json(rankings)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const rankingId = req.params.id;
            const ranking = await Ranking.findByPk(rankingId);
            res.json(ranking);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const {
                player_id,
                faction_id,
                type_id,
                ranking                
            } = req.body;
            
            assert.ok(player_id, "Player is required");
            assert.ok(faction_id, "Faction is required");
            assert.ok(type_id, "Type is required");

            let newRanking = await Ranking.create({
                player_id,
                faction_id,
                type_id,
                ranking 
            });
            res.json(newRanking);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const rankingId = req.params.id;
            const ranking = await Ranking.findByPk(rankingId);

            if(ranking) {
                const {
                    player_id,
                    faction_id,
                    type_id,
                    ranking
                } = req.body;

                if(player_id) ranking.player_id = player_id;
                if(faction_id) ranking.faction_id = faction_id;
                if(type_id) ranking.type_id = type_id;
                if(ranking) ranking.ranking = ranking;

                await ranking.save();
                res.json(ranking)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const rankingId = req.params.id;
            const ranking = await Ranking.findByPk(rankingId);

            if(ranking) {
                await ranking.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    },

};

module.exports = rankingController;
