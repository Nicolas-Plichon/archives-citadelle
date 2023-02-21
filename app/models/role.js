const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Role extends Model {}
Role.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "role",
    timestamps: true,
    underscored: true
});

module.exports = Role;