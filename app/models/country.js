const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Country extends Model {}
Country.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "country",
    timestamps: true,
    underscored: true
});

module.exports = Country;