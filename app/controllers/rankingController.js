const {
    Ranking,
    Player,
    Faction,
    Type
} = require('../models');

const rankingController = {

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
            const ranking = await Ranking.findByPk(countryId);

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
    
    // A vérifier ce qu'on doit garder ou modifier

    // Liste des Rankings, dans l'ordre décroissant
    async getAllRankings() {
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
    },

    async getOneRanking(factionName) {
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

};

module.exports = rankingController;
