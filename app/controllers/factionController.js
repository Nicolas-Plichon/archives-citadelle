const {
    Faction
} = require('../models');


const factionController = {

    async getAll(req, res) {
        try {
            const factions = await Faction.findAll();
            res.json(factions)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const factionId = req.params.id;
            const faction = await Faction.findByPk(factionId);
            res.json(faction);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { name, logo } = req.body;
            assert.ok(name, "Name is required");
            assert.ok(logo, "Logo is required");
            let newFaction = await Faction.create({
                name, logo
            });
            res.json(newFaction);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const factionId = req.params.id;
            const faction = await Faction.findByPk(factionId);

            if(faction) {
                const { name, logo } = req.body;
                if(name) faction.name = name;
                if(logo) faction.logo = logo;

                await faction.save();
                res.json(faction)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const factionId = req.params.id;
            const faction = await Faction.findByPk(factionId);

            if(faction) {
                await faction.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    },

    // A voir si on doit garder
    async getAllFactions() {
        const factionList = await Faction.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
        });
        return factionList;
    }

}

module.exports = factionController;