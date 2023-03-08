const assert = require('assert');
const {
    Version
} = require('../models');

const versionController = {

    async getAll(req, res) {
        try {
            const versions = await Version.findAll();
            res.json(versions)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const versionId = req.params.id;
            const version = await Version.findByPk(versionId);
            res.json(version);
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

            let newVersion = await Version.create({ 
                name,
                color
            });
            res.json(newVersion);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const versionId = req.params.id;
            const version = await Version.findByPk(versionId);

            if(version) {
                const { 
                    name,
                    color
                } = req.body;

                if(name) version.name = name;
                if(color) version.color = color;

                await version.save();
                res.json(version)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const versionId = req.params.id;
            const version = await Version.findByPk(versionId);

            if(version) {
                await version.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = versionController;