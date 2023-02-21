const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Type extends Model {}
Type.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "type",
    timestamps: true,
    underscored: true
});

module.exports = Type;