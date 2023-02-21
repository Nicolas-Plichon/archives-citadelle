const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Ranking extends Model {}
Ranking.init({
    ranking: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
}, {
    sequelize,
    tableName: "ranking",
    timestamps: true,
    underscored: true
});

module.exports = Ranking;

// Ajouter FK player_id, faction_id, type_id