const {
    Country
} = require('../models');

const countryController = {

    async getAll(req, res) {
        try {
            const countries = await Country.findAll({
                order: [['name', 'ASC']]
            });
            res.json(countries)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const playerId = req.params.id;
            const player = await Player.findByPk(playerId);
            res.json(player);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { name } = req.body;
            assert.ok(name, "Name is required");
            let newCountry = await Country.create({
                name
            });
            res.json(newCountry);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const countryId = req.params.id;
            const country = await Country.findByPk(countryId);

            if(country) {
                const { name } = req.body;
                if(name) country.name = name;

                await country.save();
                res.json(country)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const countryId = req.params.id;
            const country = await Country.findByPk(countryId);

            if(country) {
                await country.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = countryController;