const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Player extends Model {}
Player.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "player"
});

module.exports = Player;