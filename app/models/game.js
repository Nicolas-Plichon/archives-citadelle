const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Game extends Model {}
Game.init({
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    round: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ranking_before_a: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ranking_a_change: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ranking_after_a: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ranking_before_b: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ranking_b_change: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ranking_after_b: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING(1),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "game"
});

module.exports = Game;