const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const getDb = require('../database/bootstrap.database');

passport.use('login', new Strategy(
    (username, password, done) => {
        let message;
        const db = getDb();

        // We will ask the user to login using their email,
        // but passport-local requires we use the "username" keyword.
        // Hence why username is this instance is expecting an email address.

        db.find_user_by_email([ username ])
            .then( user => {
                if (!user[0]) {
                    message = 'That email does not match our records.';
                    return done(message);
                }
                if (user[0].password !== password) {
                    message = 'That password is incorrect.';
                    return done(message);
                }
                return done(null, user[0]);
            })
            .catch(err => {
                return done(err);
            });
    }
));

// passport.use( /* Logout Auth Strategy */ );

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((user, done) => {
    const db = getDb();
    db.find_user_by_id([ user.id ])
        .then( user => done(null, user[0]))
        .catch( err => done(err));
});

module.exports = passport;
