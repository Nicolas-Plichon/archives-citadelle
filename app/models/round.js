const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Round extends Model {}
Round.init({
    date: {
        type: DataTypes.DATE
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "round"
});

module.exports = Round;