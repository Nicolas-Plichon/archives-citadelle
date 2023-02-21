const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Faction extends Model {}
Faction.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "faction",
    timestamps: true,
    underscored: true
});

module.exports = Faction;