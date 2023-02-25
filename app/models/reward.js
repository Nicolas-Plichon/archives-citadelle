const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Reward extends Model {}
Reward.init({
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    sequelize,
    tableName: "reward"
});

module.exports = Reward;

// Ajouter FK tournament, ranking