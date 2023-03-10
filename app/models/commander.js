const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Commander extends Model {}
Commander.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "commander",
});

module.exports = Commander;