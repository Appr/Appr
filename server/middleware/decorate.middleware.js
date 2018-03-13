const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('../auth/local.auth');

function decorate(app) {
    app.use(express.static('../../build'));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(helmet());
    app.use(session({
        secret: 'It belongs in a museum!',
        resave: false,
        saveUninitialized: true,
        cookie: {
            user: { id: null }
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    return app;
}

module.exports = decorate;
