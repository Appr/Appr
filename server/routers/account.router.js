const express = require('express');
const getDb = require('../database/bootstrap.database');

const accountRouter = express.Router();

accountRouter.get('/:userid', (req, res) => {
    const userId = req.params.userid;
    const db = getDb();
    db.find_user_by_id([ userId ])
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});

accountRouter.put('/update/:userid', (req, res) => {
    const userId = req.params.userid;
    const { firstName, lastName, email, password, username } = req.body;
    const db = getDb();
    db.find_user_by_email([ email ])
        .then( user => {
            if (user[0] && user[0].id != userId) {
                return res.status(409).send({message: 'There is already an existing account using that email address.'});
            }
            else {
                db.find_user_by_username([username])
                    .then( user => {
                        if (user[0] && user[0].id != userId) {
                            return res.status(409).send({message: 'Another account is currently using that username.'});
                        }
                        else {
                            db.update_user([ userId, firstName, lastName, email, password, username ])
                                .then(promise => res.send())
                                .catch(err => res.status(500).send(err));
                        }
                    })
                    .catch(err => res.status(500).send(err));
            }
        })
        .catch(err => res.status(500).send(err));
});

accountRouter.put('/delete/:userid', (req, res) => {
    const userId = req.params.userid;
    const db = getDb();
    db.delete_user([ userId ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

module.exports = accountRouter;
