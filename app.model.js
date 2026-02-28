const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

let db;

async function makeConnection() {
    db = await sqlite.open({
        filename: 'pets.db',
        driver: sqlite3.Database
    });
}
module.exports = { makeConnection };