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
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    }, 
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
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
    tableName: "tournament"
});

module.exports = Tournament;