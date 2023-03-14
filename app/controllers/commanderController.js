const assert = require('assert');
const {
    Commander
} = require('../models');

const commanderController = {

    async getAll(req, res) {
        try {
            const commanders = await Commander.findAll();
            res.json(commanders)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const commanderId = req.params.id;
            const commander = await Commander.findByPk(commanderId);
            res.json(commander);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const {
                name,
                title,
                faction_id
            } = req.body;

            assert.ok(name, "Name is required");
            assert.ok(title, "Title is required");
            assert.ok(faction_id, "Faction is required");

            let newCommander = await Commander.create({
                name,
                title,
                faction_id
            });
            res.json(newCommander);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const commanderId = req.params.id;
            const commander = await Commander.findByPk(commanderId);

            if(commander) {
                const {
                    name,
                    title,
                    faction_id
                } = req.body;

                if(name) commander.name = name;
                if(title) commander.title = title;
                if(faction_id) commander.faction_id = faction_id;

                await commander.save();
                res.json(commander)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const commanderId = req.params.id;
            const commander = await Commander.findByPk(commanderId);

            if(commander) {
                await commander.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = commanderController;