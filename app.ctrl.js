const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');

const Model = require('./app.model.js');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

Model.makeConnection();

app.get('/', async function(req, res) {
    
    const petArray = await Model.getAllPets();
    console.log(petArray);

    const RecordArray = await Model.getAllRecords();
    console.log(RecordArray);
    res.render('main_page', { records: RecordArray, pets: petArray } );
});

app.get('/add-form', async function(req, res){
    const petArray = await Model.getAllPets();
     res.render('main_page', { pets: petArray, addpet: true } );
});


app.post('/add-pet', async function(req, res) {
    const pet = {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        birth_date: req.body.birth_date
    }

    Model.addPet(pet);
    res.redirect('/');
});

app.get('/delete-form', async function(req, res) {
    const petArray = await Model.getAllPets();
    res.render('main_page', { pets: petArray, deletepet: true } );
}); 

app.post('/delete-pet', async function(req, res){
    Model.deletePet(req.body.id)
    res.redirect('/');
});

app.get('/record-page', async function(req, res){
    const recordArray = await Model.getAllRecords();
    res.render('records-page', {records: recordArray});
});

app.get('/add-record-form', async function(req, res){
    const recordArray = await Model.getAllRecords();
     res.render('records-page', { records: recordArray, addrecord: true } );
});


app.post('/add-record', async function(req, res){
    const record = {
        pet_id: req.body.pet_id,
        visit_date: req.body.visit_date,
        vist_type: req.body.vist_type,
        weight: req.body.weight,
        cost: req.body.cost,
        notes: req.body.notes
    }
    Model.addRecord(record);
    res.redirect('/record-page');
});




app.listen(3000, () => { console.log("Server listening on port 3000")});