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

app.post('/delete-pet', async function(req, res){
    Model.deletePet(req.body.id)
    res.redirect('/');
});




app.listen(3000, () => { console.log("Server listening on port 3000")});