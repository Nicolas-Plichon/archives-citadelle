const assert = require('assert');
const {
    Type
} = require('../models');

const typeController = {

    async getAll(req, res) {
        try {
            const types = await Type.findAll();
            res.json(types)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const typeId = req.params.id;
            const type = await Type.findByPk(typeId);
            res.json(type);
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

            let newType = await Type.create({ 
                name,
                color
            });
            res.json(newType);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const typeId = req.params.id;
            const type = await Type.findByPk(typeId);

            if(type) {
                const { 
                    name,
                    color
                } = req.body;

                if(name) type.name = name;
                if(color) type.color = color;

                await type.save();
                res.json(type)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const typeId = req.params.id;
            const type = await Type.findByPk(typeId);

            if(type) {
                await type.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = typeController;