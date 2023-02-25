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
    },
    color: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: "type"
});

module.exports = Type;