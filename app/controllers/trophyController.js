const assert = require('assert');
const {
    Trophy
} = require('../models');

const trophyController = {

    async getAll(req, res) {
        try {
            const trophies = await Trophy.findAll();
            res.json(trophies)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const trophyId = req.params.id;
            const trophy = await Trophy.findByPk(trophyId);
            res.json(trophy);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { name } = req.body;

            assert.ok(name, "Name is required");

            let newTrophy = await Trophy.create({
                name
            });
            res.json(newTrophy);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const trophyId = req.params.id;
            const trophy = await Trophy.findByPk(trophyId);

            if(trophy) {
                const { 
                    name
                } = req.body;

                if(name) trophy.name = name;

                await trophy.save();
                res.json(trophy)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const trophyId = req.params.id;
            const trophy = await Trophy.findByPk(trophyId);

            if(role) {
                await trophy.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = trophyController;