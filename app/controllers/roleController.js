const assert = require('assert');
const {
    Role
} = require('../models');

const roleController = {

    async getAll(req, res) {
        try {
            const role = await Role.findAll();
            res.json(role)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const roleId = req.params.id;
            const role = await Role.findByPk(roleId);
            res.json(role);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { name } = req.body;

            assert.ok(name, "Name is required");

            let newRole = await Role.create({
                name
            });
            res.json(newRole);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const roleId = req.params.id;
            const role = await Role.findByPk(roleId);

            if(reward) {
                const { 
                    name
                } = req.body;

                if(name) role.name = name;

                await role.save();
                res.json(role)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const roleId = req.params.id;
            const role = await Role.findByPk(roleId);

            if(role) {
                await role.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = roleController;