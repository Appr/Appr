const express = require('express');
const getDb = require('../database/bootstrap.database');
const passport = require('../auth/local.auth');

const authRouter = express.Router();

authRouter.post('/register', (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const db = getDb();
    db.find_user_by_email([ email ])
        .then( user => {
            if (user[0]) {
                res.send({message: 'There is already an existing account using that email address.'});
            }
            else {
                db.find_user_by_username([ username ])
                    .then( user => {
                        if (user[0]) {
                            res.send({message: 'That username already exists.'});
                        }
                        else {
                            db.register_user([ firstName, lastName, email, password, username ])
                                .then(promise => res.send({message: 'Registration was successful!'}))
                                .catch(err => res.status(500).send(err));
                        }
                    })
                    .catch(err => res.status(500).send(err));
            }
        })
        .catch(err => res.status(500).send(err));
});

authRouter.post('/login-test', (req, res) => {
    const { username, password } = req.body;
    let message = '';
    const db = getDb();
    db.find_user_by_email([ username ])
        .then( user => {
            if (!user[0]) {
                message = 'That email does not match our records.';
                res.send(message);
            }
            if (user[0].password !== password) {
                message = 'That password is incorrect.';
                res.send(message);
            }
            else {
                message = 'login test was successful!';
                res.send(message);
            }
        })
        .catch(err => {throw err});
});

authRouter.post('/login', passport.authenticate('login'), (req, res) => {
    res.send(req.user);
});

// authRouter.post('/logout');

module.exports = authRouter;
