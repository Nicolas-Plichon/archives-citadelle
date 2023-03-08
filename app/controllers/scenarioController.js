const assert = require('assert');
const {
    Scenario
} = require('../models');

const scenarioController = {

    async getAll(req, res) {
        try {
            const scenarios = await Scenario.findAll();
            res.json(scenarios)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const scenarioId = req.params.id;
            const scenario = await Scenario.findByPk(scenarioId);
            res.json(scenario);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { name } = req.body;

            assert.ok(name, "Name is required");

            let newScenario = await Scenario.create({ 
                name
            });
            res.json(newScenario);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const scenarioId = req.params.id;
            const scenario = await Scenario.findByPk(scenarioId);

            if(scenario) {
                const { 
                    name
                } = req.body;

                if(name) scenario.name = name;

                await scenario.save();
                res.json(scenario)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const scenarioId = req.params.id;
            const scenario = await Scenario.findByPk(scenarioId);

            if(scenario) {
                await scenario.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = scenarioController;