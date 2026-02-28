const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function dbinit() {
    const db = await sqlite.open({
        filename: 'pets.db',
        driver: sqlite3.Database
    });

    await db.exec('DROP TABLE IF EXISTS Pets');
    await db.exec('CREATE TABLE Pets (pet_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, species TEXT, breed TEXT, birth_date TEXT)');

    await db.exec('DROP TABLE IF EXISTS Records');
    await db.exec('CREATE TABLE Records (id INTEGER PRIMARY KEY AUTOINCREMENT, pet_id INT, visit_date TEXT, visit_type TEXT, weight REAL, cost REAL, notes TEXT)');
    
    await db.run('INSERT INTO Pets VALUES (?,?,?,?,?), ["Spot", "Dog", "Retriever", "2016-05-04"] ');
    await db.run('INSERT INTO Records VALUES (?,?,?,?,?,?), ["1", "2026-01-05", "Vaccination", "20.2", "150.54", "no concerns"] ');

}
dbinit();