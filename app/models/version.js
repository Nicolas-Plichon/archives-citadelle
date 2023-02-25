const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Version extends Model {}
Version.init({
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
    tableName: "version"
});

module.exports = Version;