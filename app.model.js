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

async function addPet(pet) {
    await db.run(
        'INSERT INTO pets(name, species, breed, birth_date) VALUES (?,?,?,?)',
         [pet.name, pet.species, pet.breed, pet.birth_date] 
    );
}

async function addRecord(record) {
    await db.run(
        'INSERT INTO records(pet_id, visit_date, visit_type, weight, cost, notes VALUES (?,?,?,?,?)',
        [record.pet_id, record.visit_date, record.visit_type, record.weight, record.cost, record.notes]
    );
}

async function deletePet(pet) {
    await db.run(
        'DELETE FROM pets WHERE pet_id = (?)', [pet.pet_id]
    );
}

async function deleteRecord(record) {
    await db.run(
        'DELETE FROM records WHERE id = (?)', [record.id]
    );
}

module.exports = { 
    makeConnection, 
    getAllPets, 
    getAllRecords, 
    addPet, 
    addRecord, 
    deletePet, 
    deleteRecord
};