const massive = require('massive');
const connectionString = require('./connection.database.js');

let db;
let messageString;

massive(connectionString)
    .then( dbInstance => {
        db = dbInstance;
        messageString = 'Connection to the database was successful.'
        return dbInstance.appr_init()
    })
    .catch( err => {
        throw err
    });

function getDb() {
    if (!db) {
        messageString = 'We haven\'t connected to the database yet.';
        console.error(messageString);
        return messageString;
    }
    else {
        return db;
    }
}

module.exports = getDb;
