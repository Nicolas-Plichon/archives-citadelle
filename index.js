require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session')
const globalRouter = require('./app/router');


const cors = require('cors');
const middlewares = require('./app/middlewares');
const multer = require('multer');
const bodyParser = multer();

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.json());

// Pour récupérer les formulaires - A priori plus nécessaire grâce à l'encodage json
// app.use(express.urlencoded({
//    extended: true
// }));

/* ---------- Middlewares ---------- */
app.use(cors('*')); // On autorise tous les domaines à faire du Cross Origin Resource Sharing.
// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
app.use( bodyParser.none() );
app.use(middlewares.bodySanitizer);
app.use(globalRouter);

// Les Static sont dans /assets
app.use(express.static(path.join(__dirname, './assets')))
app.use(middlewares.notFoundMiddleware);

app.use(session({
   resave: true,
   saveUninitialized: true,
   secret: process.env.APP_SESSION_SECRET,
   cookie: {
      secure: false,
      maxAge: (1000 * 60 * 60) // ça fait une heure
   }
}));

/* ---------- App ---------- */
app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});