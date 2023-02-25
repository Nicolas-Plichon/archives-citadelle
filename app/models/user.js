const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class User extends Model {}
User.init({
    nickname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    firstname: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    lastname: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: "user"
});

module.exports = User;