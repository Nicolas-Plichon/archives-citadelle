const assert = require('assert');
const {
    Round
} = require('../models');

const roundController = {

    async getAll(req, res) {
        try {
            const rounds = await Round.findAll();
            res.json(rounds)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const roundId = req.params.id;
            const round = await Round.findByPk(roundId);
            res.json(round);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { 
                tournament_id,
                date,
                position,
                scenario_id
            } = req.body;

            assert.ok(tournament_id, "Nickname is required");
            assert.ok(date, "Email is required");
            assert.ok(position, "Password is required");

            let newRound = await Round.create({ 
                tournament_id,
                date,
                position,
                scenario_id
            });
            res.json(newRound);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const roundId = req.params.id;
            const round = await Round.findByPk(roundId);

            if(round) {
                const { 
                    tournament_id,
                    date,
                    position,
                    scenario_id
                } = req.body;

                if(tournament_id) round.tournament_id = tournament_id;
                if(date) round.date = date;
                if(position) round.position = position;
                if(scenario_id) round.scenario_id = scenario_id;

                await round.save();
                res.json(round)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const roundId = req.params.id;
            const round = await Round.findByPk(roundId);

            if(round) {
                await round.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = roundController;