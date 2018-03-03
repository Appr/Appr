const express = require('express');
const getDb = require('../database/bootstrap.database');

const accountRouter = express.Router();


// find by id
accountRouter.get('/:userid', (req, res) => {
    const userId = req.params.userid;
    const passportId = req.user[0].id;
    if(!req.user){
        res.send({newPath: `login`})
    }
    if(userId != req.user[0].id){
        res.send({newPath: `user/${passportId}/dashboard`})
    }

        // res.redirect('/');
    const db = getDb();
    db.find_user_by_id([ userId ])
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});

// find by username
accountRouter.post('/username', (req, res) => {
    const { username } = req.body;
    if(username !== req.user[0].username)
        // res.redirect('/');
        console.log('thats not you2');

    const db = getDb();
    db.find_user_by_username([ username ])
        .then(user => res.send(user[0].username))
        .catch(err => res.status(500).send(err));
});

accountRouter.put('/update/:userid', (req, res) => {
    const userId = req.params.userid;
    if(userId !== req.user[0].id)
        // res.redirect('/');
        console.log('thats not you3');
    const { firstName, lastName, email, password, username, avatar } = req.body;
    const db = getDb();
    db.find_user_by_email([ email ])
        .then( user => {
            if (user[0] && user[0].id != userId) {
                return res.status(409).send({message: 'There is already an existing account using that email address.'});
            }
            else {
                db.find_user_by_username([username])
                    .then( user => {
                        if (user[0] && user[0].id != userid) {
                            return res.status(409).send({message: 'Another account is currently using that username.'});
                        }
                        else {
                            db.update_user([ userId, firstName, lastName, email, password, username, avatar ])
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
    const userId = req.params.userId;
    if(userId !== req.user[0].id)
        // res.redirect('/');
         console.log('thats not you4');
    const db = getDb();
    db.delete_user([ userId ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

//find user info
accountRouter.get('/info/:userid', (req, res) => {
    const userId = req.params.userid;
    if(userId != req.user[0].id)
    // res.redirect('/');
     console.log('thats not you5');
    const db = getDb();
    db.find_user_info([ userId ])
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});

//update user info

accountRouter.put('/info/update/:userid', (req, res) => {
    const userId = req.params.userid;
    const { firstName, lastName, email, password, username, avatar } = req.body;
    if(userId !== req.user[0].id)
        // res.redirect('/');
        console.log('thats not you5');
    const db = getDb();
    db.update_user([ userId, firstName, lastName, email, password, username, avatar ])
    .then(promise => res.send())
    .catch(err => res.status(500).send(err));
});




//New stuff 03/3/2018



accountRouter.put('/info/update/password/:userid', (req, res) => {
    const userId = req.params.userid;
    const { password } = req.body;
    if(userId !== req.user[0].id){
        res.send('NO NO NO NO NO NO NO');
    }
    const db = getDb();
    db.update_user_password([ userId, password])
    .then(promise => res.send())
    .catch(err => res.status(500).send(err));
});


module.exports = accountRouter;
