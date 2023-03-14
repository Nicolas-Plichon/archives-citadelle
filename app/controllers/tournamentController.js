const assert = require('assert');
const {
    Tournament,
    Type,
    Round,
    Scenario,
    Style,
    Version,
    Country
} = require('../models');

const gameController = require('./gameController');

const { Op } = require('sequelize');

const tournamentController = {

    async all(req, res) {
        try {
            const openTournaments = await tournamentController.getOpen();
            const closedTournaments = await tournamentController.getClosed();
            res.render('tournaments', {
                openTournaments,
                closedTournaments
            })
        } catch (err) {
            console.log(err)
        }
    },

    async allOpen(req, res) {
        try {
            const openTournaments = await tournamentController.getOpen();
            res.render('tournaments', {
                openTournaments
            })
        } catch (err) {
            console.log(err)
        }
    },

    async allClosed(req, res) {
        try {
            const closedTournaments = await tournamentController.getClosed();
            res.render('tournaments', {
                closedTournaments
            })
        } catch (err) {
            console.log(err)
        }
    },

    async one(req, res) {
        const tournamentId = req.params.id;
        try {
            const games = await gameController.getOneTournament(tournamentId);
            const rounds = await tournamentController.getCountOfRounds(tournamentId);
            const count = rounds.count;
            const table = rounds.rows;
            res.render('tournamentGames', {
                games,
                count,
                table
            })
        } catch (err) {
            console.log(err)
        }
    },

    async allFromCountry(req, res) {
        const countryName = req.params.countryName
        try {
            const openTournaments = await tournamentController.getOpenFromCountry(countryName);
            const closedTournaments = await tournamentController.getClosedFromCountry(countryName);
            res.render('tournaments', {
                openTournaments,
                closedTournaments
            })
        } catch (err) {
            console.log(err)
        }
    },

    async allOpenFromCountry(req, res) {
        const countryName = req.params.countryName
        try {
            const openTournaments = await tournamentController.getOpenFromCountry(countryName);
            res.render('tournaments', {
                openTournaments,
            })
        } catch (err) {
            console.log(err)
        }
    },

    async allClosedFromCountry(req, res) {
        const countryName = req.params.countryName
        try {
            const closedTournaments = await tournamentController.getClosedFromCountry(countryName);
            res.render('tournaments', {
                closedTournaments
            })
        } catch (err) {
            console.log(err)
        }
    },

    async getAll(req, res) {
        try {
            const tournaments = await Tournament.findAll();
            res.json(tournaments)
        } catch (err) {
            console.log(err);
        }
    },

    async getOne(req, res) {
        try {
            const tournamentId = req.params.id;
            const tournament = await Tournament.findByPk(tournamentId);
            res.json(tournament);
        } catch (err) {
            console.log(err)
        }
    },

    async getOpen() {
        const tournamentList = await Tournament.findAll({
            attributes: ['id', 'name', 'start_date', 'link', 'is_closed'],
            where: { is_closed: false},
            order: [['start_date', 'ASC']],
            include: [{
                model: Type,
                as: 'tournament_type',
                attributes: ['name']
            },
            {
                model: Country,
                as: 'tournament_country',
                attributes: ['name']
            }]
        });
        return tournamentList;
    },
    
    async getClosed() {
        const tournamentList = await Tournament.findAll({
            attributes: ['id', 'name', 'start_date', 'link', 'is_closed'],
            where: { is_closed: true},
            order: [['start_date', 'ASC']],
            include: [{
                model: Type,
                as: 'tournament_type',
                attributes: ['name']
            },
            {
                model: Country,
                as: 'tournament_country',
                attributes: ['name']
            }]
        });
        return tournamentList;
    },

    async getOpenFromCountry(countryName) {
        const tournamentList = await Tournament.findAll({
            attributes: ['id', 'name', 'start_date', 'link', 'is_closed'],
            where: { is_closed: false},
            order: [['start_date', 'ASC']],
            include: [{
                model: Type,
                as: 'tournament_type',
                attributes: ['name']
            },
            {
                model: Country,
                as: 'tournament_country',
                where: {name: countryName},
                attributes: ['name']
            }]
        });
        return tournamentList;
    },
    
    async getClosedFromCountry(countryName) {
        const tournamentList = await Tournament.findAll({
            attributes: ['id', 'name', 'start_date', 'link', 'is_closed'],
            where: { is_closed: true},
            order: [['start_date', 'ASC']],
            include: [{
                model: Type,
                as: 'tournament_type',
                attributes: ['name']
            },
            {
                model: Country,
                as: 'tournament_country',
                where: {name: countryName},
                attributes: ['name']
            }]
        });
        return tournamentList;
    },

    async getCountOfRounds(tournamentId) {
        const { count, rows } = await Round.findAndCountAll({
            attributes: ['id', 'date', 'position'],
            where: {'$round_tournament.id$': tournamentId},
            order: [['position', 'ASC']],
            include: [{
                model: Tournament,
                as: 'round_tournament',
                attributes: ['id', 'name', 'start_date', 'end_date', 'link', 'is_closed'],
                include: [{
                    model: Type,
                    as: 'tournament_type',
                    attributes: ['id', 'name', 'color']
                },{
                    model: Style,
                    as: 'tournament_style',
                    attributes: ['id', 'name', 'color']
                },{
                    model: Version,
                    as: 'tournament_version',
                    attributes: ['id', 'name', 'color']
                }]
            },{
                model: Scenario,
                as: 'round_scenario',
                attributes: ['id', 'name']
            }]
        })
        return { count, rows };
    },

    async create(req, res) {
        try {
            const {
                name,
                start_date,
                end_date,
                type_id,
                style_id,
                version_id,
                link,
                is_closed
            } = req.body;

            assert.ok(name, "Name is required");
            assert.ok(start_date, "Date of Start is required");
            assert.ok(type_id, "Date of Start is required");
            assert.ok(style_id, "Date of Start is required");
            assert.ok(version_id, "Date of Start is required");

            let newTournament = await Tournament.create({
                name,
                start_date,
                end_date,
                type_id,
                style_id,
                version_id,
                link,
                is_closed
            });
            res.json(newTournament);
        } catch (err) {
            console.log(err)
        }
    },

    async update (req, res, next) {
        try {
            const tournamentId = req.params.id;
            const tournament = await Faction.findByPk(tournamentId);

            if(tournament) {
                const {
                    name,
                    start_date,
                    end_date,
                    type_id,
                    style_id,
                    version_id,
                    link,
                    is_closed
                } = req.body;

                if(name) tournament.name = name;
                if(start_date) tournament.start_date = start_date;
                if(end_date) tournament.end_date = end_date;
                if(type_id) tournament.type_id = type_id;
                if(style_id) tournament.style_id = style_id;
                if(version_id) tournament.version_id = version_id;
                if(link) tournament.link = link;
                if(is_closed) tournament.is_closed = is_closed;

                await tournament.save();
                res.json(tournament)
           
            } else {
                next();
            }

        } catch (err) {
            console.log(err)
        }
    },

    async delete (req, res) {
        try {
            const tournamentId = req.params.id;
            const tournament = await Faction.findByPk(tournamentId);

            if(tournament) {
                await tournament.destroy();
                res.send('OK');
            } else {    
                next();
            }
        } catch (err) {
            console.log(err)
        }
    },

}

module.exports = tournamentController;