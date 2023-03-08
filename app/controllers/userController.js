const assert = require('assert');
const {
    User
} = require('../models');

const userController = {

    async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.json(users)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            res.json(user);
        } catch (err) {
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const { 
                nickname,
                email,
                password,
                firstName,
                lastName,
                role_id
            } = req.body;

            assert.ok(nickname, "Nickname is required");
            assert.ok(email, "Email is required");
            assert.ok(password, "Password is required");
            assert.ok(role_id, "Role ID is required");

            let newUser = await User.create({ 
                nickname,
                email,
                password,
                firstName,
                lastName,
                role_id
            });
            res.json(newUser);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);

            if(user) {
                const { 
                    nickname,
                    email,
                    password,
                    firstName,
                    lastName,
                    role_id
                } = req.body;

                if(nickname) user.nickname = nickname;
                if(email) user.email = email;
                if(password) user.password = password;
                if(firstName) user.firstName = firstName;
                if(lastName) user.lastName = lastName;
                if(role_id) user.role_id = role_id;

                await user.save();
                res.json(user)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);

            if(user) {
                await user.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = userController;