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
    },
    logo: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: "faction"
});

module.exports = Faction;