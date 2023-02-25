const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Ranking extends Model {}
Ranking.init({
    ranking: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 150
    },
}, {
    sequelize,
    tableName: "ranking",
});

module.exports = Ranking;