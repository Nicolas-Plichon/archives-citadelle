const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Trophy extends Model {}
Trophy.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize,
    tableName: "trophy",
    timestamps: true,
    underscored: true
});

module.exports = Trophy;