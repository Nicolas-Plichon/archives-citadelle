const express = require('express');
const path = require('path');

const gameController = require('./gameController');

const mainController = {

    homePage(req, res) {
        let filePath = path.join(__dirname, '../../assets/html/index.html');
        res.sendFile(filePath);
    },

    maesterHomePage(req, res) {
        res.render('home');
    },

    adminHomePage(req, res) {
        res.render('home');
    },

    

    

    async pageGames(req, res) {
        try {
            const games = await gameController.getAllGames();
            res.render('games', {
                games
            })
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = mainController;