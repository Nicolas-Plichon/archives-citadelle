const {
    Country
} = require('../models');

const countryController = {

    async getAll(req, res, next) {
        try {
            const countries = await Country.findAll();
            res.render('countries', {
                countries
            })
        } catch (err) {
            next(err);
        }
    },

}


module.exports = {
    countryController 
};