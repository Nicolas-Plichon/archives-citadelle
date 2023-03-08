const assert = require('assert');
const {
    Reward
} = require('../models');

const rewardController = {

    async getAll(req, res) {
        try {
            const rewards = await Reward.findAll();
            res.json(rewards)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const rewardId = req.params.id;
            const reward = await Reward.findByPk(rewardId);
            res.json(reward);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { 
                description,
                tournament_id,
                ranking_id,
                trophy_id
            } = req.body;

            assert.ok(description, "Description is required");
            assert.ok(tournament_id, "Tournament ID is required");
            assert.ok(ranking_id, "Ranking ID is required");
            assert.ok(trophy_id, "Trophy ID is required");

            let newReward = await Reward.create({
                description,
                tournament_id,
                ranking_id,
                trophy_id
            });
            res.json(newReward);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const rewardId = req.params.id;
            const reward = await Reward.findByPk(rewardId);

            if(reward) {
                const { 
                    description,
                    tournament_id,
                    ranking_id,
                    trophy_id
                } = req.body;

                if(description) reward.description = description;
                if(tournament_id) reward.tournament_id = tournament_id;
                if(ranking_id) reward.ranking_id = ranking_id;
                if(trophy_id) reward.trophy_id = trophy_id;


                await reward.save();
                res.json(reward)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const rewardId = req.params.id;
            const reward = await Reward.findByPk(rewardId);

            if(reward) {
                await reward.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = rewardController;