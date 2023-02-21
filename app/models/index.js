const Commander = require('./commander');
const Country = require('./country');
const Faction = require('./faction');
const Game = require('./game');
const Player = require('./player');
const Ranking = require('./ranking');
const Reward = require('./reward');
const Role = require('./role');
const Scenario = require('./scenario');
const Tournament = require('./tournament');
const Trophy = require('./trophy');
const Type = require('./type');
const User = require('./user');

// User 1N - 0N Role (Many to Many) - Table de Liaison "user_has_role"
User.belongsToMany(Role, {
    as: "roles",
    through: "user_has_role",
    foreignKey: "user_id",
    otherKey: "role_id"
});

Role.belongsToMany(User, {
    as: "users",
    through: "user_has_role",
    foreignKey: "role_id",
    otherKey: "user_id"
});

// User 01 - 01 Player (One to One)
User.belongsTo(Player, {
    as: "player",
    foreignKey: "player_id"
})

// Ranking 1,1 - 0,N Player (One to Many)
Player.hasMany(Ranking, {
    foreignKey: "player_id",
    as: "rankings"
});

Ranking.belongsTo(Player, {
    foreignKey: "player_id",
    as: "ranking_player"
});

// Ranking 11 - 0N Faction (One to Many)
Faction.hasMany(Ranking, {
    foreignKey: "faction_id",
    as: "factions"
});

Ranking.belongsTo(Faction, {
    foreignKey: "faction_id",
    as: "ranking_faction"
});

// Ranking 11 - 0N Type (One to Many)
Type.hasMany(Ranking, {
    foreignKey: "type_id",
    as: "types"
});

Ranking.belongsTo(Type, {
    foreignKey: "type_id",
    as: "ranking_type"
});

// Player 11 - 0N Country (One to Many)
Country.hasMany(Player, {
    foreignKey: "country_id",
    as: "players"
});

Player.belongsTo(Country, {
    foreignKey: "country_id",
    as: "player_country"
});

// Game 11 - 0N Ranking (One to Many)
Ranking.hasMany(Game, {
    foreignKey: "ranking_a_id",
    as: "games_a"
});

Game.belongsTo(Ranking, {
    foreignKey: "ranking_a_id",
    as: "game_ranking_a"
});

// Game 11 - 0N Ranking (One to Many)
Ranking.hasMany(Game, {
    foreignKey: "ranking_b_id",
    as: "games_b"
});

Game.belongsTo(Ranking, {
    foreignKey: "ranking_b_id",
    as: "game_ranking_b"
});

// Game 11 - 0N Scenario (One to Many)
Scenario.hasMany(Game, {
    foreignKey: "scenario_id",
    as: "games"
});

Game.belongsTo(Scenario, {
    foreignKey: "scenario_id",
    as: "game_scenario"
});

// Game 11 - 0N Commander (One to Many)
Commander.hasMany(Game, {
    foreignKey: "commander_a_id",
    as: "games_a"
});

Game.belongsTo(Commander, {
    foreignKey: "commander_a_id",
    as: "game_commander_a"
});

// Game 11 - 0N Commander (One to Many)
Commander.hasMany(Game, {
    foreignKey: "commander_b_id",
    as: "games_b"
});

Game.belongsTo(Commander, {
    foreignKey: "commander_b_id",
    as: "game_commander_b"
});

// Commander 11 - 0N Faction (One to Many)
Faction.hasMany(Commander, {
    foreignKey: "faction_id",
    as: "commanders"
});

Commander.belongsTo(Faction, {
    foreignKey: "faction_id",
    as: "commander_faction"
});

// Game 11 - 0N Tournament (One to Many)
Tournament.hasMany(Game, {
    foreignKey: "tournament_id",
    as: "games"
});

Game.belongsTo(Tournament, {
    foreignKey: "tournament_id",
    as: "game_tournament"
});

// Tournament 01 - 0N Country (One to Many)
Country.hasMany(Tournament, {
    foreignKey: "country_id",
    as: "tournaments"
});

Tournament.belongsTo(Country, {
    foreignKey: "country_id",
    as: "tournament_country"
});

// Tournament 11 - 0N Type (One to Many)
Type.hasMany(Tournament, {
    foreignKey: "type_id",
    as: "tournaments"
});

Tournament.belongsTo(Type, {
    foreignKey: "type_id",
    as: "tournament_type"
});

// Reward 11 - 0N Tournament (One to Many)
Tournament.hasMany(Reward, {
    foreignKey: "tournament_id",
    as: "rewards"
});

Reward.belongsTo(Tournament, {
    foreignKey: "tournament_id",
    as: "reward_tournament"
});

// Reward 11 - 0N Ranking (One to Many)
Ranking.hasMany(Reward, {
    foreignKey: "ranking_id",
    as: "rewards"
});

Reward.belongsTo(Ranking, {
    foreignKey: "ranking_id",
    as: "reward_ranking"
});

// Reward 11 - 0N Trophy (One to Many)
Trophy.hasMany(Reward, {
    foreignKey: "trophy_id",
    as: "trophies"
});

Reward.belongsTo(Trophy, {
    foreignKey: "trophy_id",
    as: "reward_trophy"
});


module.exports = {
    Commander,
    Country,
    Faction,
    Game, 
    Player,
    Ranking,
    Reward,
    Role,
    Scenario,
    Tournament,
    User,
    Trophy,
    Type
}