const assert = require('assert');
const {
    Style
} = require('../models');

const styleController = {

    async getAll(req, res) {
        try {
            const styles = await Style.findAll();
            res.json(styles)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const styleId = req.params.id;
            const style = await Style.findByPk(styleId);
            res.json(style);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { 
                name,
                color
            } = req.body;

            assert.ok(name, "Name is required");

            let newStyle = await Style.create({ 
                name,
                color
            });
            res.json(newStyle);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const styleId = req.params.id;
            const style = await Style.findByPk(styleId);

            if(style) {
                const { 
                    name,
                    color
                } = req.body;

                if(name) style.name = name;
                if(color) style.color = color;

                await style.save();
                res.json(style)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const styleId = req.params.id;
            const style = await Style.findByPk(styleId);

            if(style) {
                await style.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = styleController;