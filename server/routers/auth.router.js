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
                return res.status(409).send({message: 'There is already an existing account using that email address.'});
            }
            else {
                db.find_user_by_username([ username ])
                    .then( user => {
                        if (user[0]) {
                            return res.status(409).send({message: 'That username already exists.'});
                        }
                        else {
                            db.register_user([ firstName, lastName, email, password, username ])
                                .then( promise => res.status(200).send())
                                .catch( err => res.send(err));
                        }
                    })
                    .catch(err => res.send(err));
            }
        })
        .catch( err => res.send(err));
});

authRouter.post('/login', passport.authenticate('login'), (req, res) => {
    res.send(req.user);
});

// authRouter.post('/logout');

module.exports = authRouter;
