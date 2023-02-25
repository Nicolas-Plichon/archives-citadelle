const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Style extends Model {}
Style.init({
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
    tableName: "style"
});

module.exports = Style;