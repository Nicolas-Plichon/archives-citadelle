require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session')
const globalRouter = require('./app/router');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

// Pour récupérer les formulaires ?
app.use(express.urlencoded({
   extended: true
}));

// Les Static sont dans /assets
app.use(express.static(path.join(__dirname, './assets')))

app.use(session({
   resave: true,
   saveUninitialized: true,
   secret: "Guess it!",
   cookie: {
      secure: false,
      maxAge: (1000 * 60 * 60) // ça fait une heure
   }
}));

app.use(globalRouter);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});