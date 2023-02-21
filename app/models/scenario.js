const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Scenario extends Model {}
Scenario.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "scenario",
    timestamps: true,
    underscored: true
});

module.exports = Scenario;