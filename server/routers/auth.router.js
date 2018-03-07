
const express = require('express');
const getDb = require('../database/bootstrap.database');
const passport = require('../auth/local.auth');
const bcrypt = require('bcryptjs');


const authRouter = express.Router();

authRouter.post('/register', (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    //EMAIL VALIDATION//
    const db = getDb(); 
    db.find_user_by_email([ email ])
        .then( user => {
            if(email === user[0].email){
                res.send({emailError: 'Email already in use'})
            }
        })
    //EMAIL VALIDATION//
    //PASSWORD VALIDATION//
    if(password.length < 8){
        return res.send({passwordError: 'Password must contain at least eight characters!'})
    }
    //PASSWORD VALIDATION//

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, function(err, hash){
                console.log(hash);
                const db = getDb();
                db.register_user([ firstName, lastName, email, hash, username ])
                    .then(promise => res.send(hash))
                    .catch(err => res.status(500).send(err));
            });
        });
    

})







// authRouter.post('/register', (req, res) => {
//     const { firstName, lastName, email, password, username } = req.body;
//     const db = getDb();
//     db.find_user_by_email([ email ])
//         .then( user => {
//             if (user[0]) {
//                 res.send({message: 'There is already an existing account using that email address.'});
//             }
//             else {
//                 db.find_user_by_username([ username ])
//                     .then( user => {
//                         if (user[0]) {
//                             res.send({message: 'That username already exists.'});
//                         }
//                         else {
//                             db.register_user([ firstName, lastName, email, password, username ])
//                                 .then(promise => res.send({message: 'Registration was successful!'}))
//                                 .catch(err => res.status(500).send(err));
//                         }
//                     })
//                     .catch(err => res.status(500).send(err));
//             }
//         })
//         .catch(err => res.status(500).send(err));
// });

authRouter.post('/login-test', (req, res) => {
    const { username, password } = req.body;
    let message = '';
    const db = getDb(); 

    db.find_user_by_email([ username ])
        .then( user => {
            console.log(user[0].password)
            console.log(password)
            if( password === user[0].password){
                message = 'login test was successful!';
                res.send(user[0].password);
            }

            bcrypt.compare(password, user[0].password, function(err, result){
                console.log(result)
                if(result === true){
                    message = 'login test was successful!';
                    res.send(user[0].password);
                } else {
                    message = 'Wrong account information!'
                }
            })
        })
        .catch(err => {throw err
        });
});

authRouter.post('/login', passport.authenticate('login'), (req, res) => {
    console.log(req.user)
    res.send(req.user);
});

authRouter.get('/logout', (req, res) => {
    req.logout();
});

module.exports = authRouter;
