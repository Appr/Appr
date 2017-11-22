const express = require('express');
const getDb = require('../database/bootstrap.database');

const accountRouter = express.Router();

accountRouter.get('/:userid', (req, res) => {
    const userId = req.params.userid;
    const db = getDb();
    db.find_user_by_id([ userId ])
        .then( user => res.send(user))
        .catch( err => res.send(err));
});

accountRouter.put('/update/:userid', (req, res) => {
    const userId = req.params.userid;
    const { firstName, lastName, email, password, username } = req.body;
    const db = getDb();
    db.find_user_by_email([ email ])
        .then( user => {
            if (user[0]) {
                return res.status(409).send({message: 'There is already an existing account using that email address.'});
            }
            else {
                db.find_user_by_username([username])
                    .then( user => {
                        if (user[0]) {
                            return res.status(409).send({message: 'Another account is currently using that username.'});
                        }
                        else {
                            db.update_user([ userId, firstName, lastName, email, password, username ])
                                .then( promise => res.status(200).send())
                                .catch( err => res.send(err));
                        }
                    })
                    .catch(err => res.send(err));
            }
        })
        .catch(err => res.send(err));
});

accountRouter.delete('/delete/:userid', (req, res) => {
    const userId = req.params.userid;
    const db = getDb();
    db.delete_user([ userId ])
        .then( promise => res.status(200).send())
        .catch( err => res.send(err));
});

module.exports = accountRouter;
