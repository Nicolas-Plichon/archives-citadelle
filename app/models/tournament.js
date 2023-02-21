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
    }
}, {
    sequelize,
    tableName: "tournament",
    timestamps: true,
    underscored: true
});

module.exports = Tournament;

// Ajouter FK type, winner