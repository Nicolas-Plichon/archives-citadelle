const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Tournament extends Model {}
Tournament.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    }, 
    link: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_closed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: "tournament",
    timestamps: true,
    underscored: true
});

module.exports = Tournament;