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
    }
}, {
    sequelize,
    tableName: "commander",
    timestamps: true,
    underscored: true
});

module.exports = Commander;

// Ajouter FK faction