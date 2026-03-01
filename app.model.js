const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

let db;

async function makeConnection() {
    db = await sqlite.open({
        filename: 'pets.db',
        driver: sqlite3.Database
    });
}

async function getAllPets() {
    const results = await db.all('SELECT rowid, * FROM pets');
    return results;
}

async function getAllRecords() {
    const results = await db.all('SELECT rowid, * FROM records');
    return results;
}



module.exports = { makeConnection, getAllPets, getAllRecords};