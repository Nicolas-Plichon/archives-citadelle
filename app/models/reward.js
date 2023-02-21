const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Reward extends Model {}
Reward.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize,
    tableName: "reward",
    timestamps: true,
    underscored: true
});

module.exports = Reward;

// Ajouter FK tournament, ranking