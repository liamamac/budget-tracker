const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const multer = require('multer')

const Model = require('./app.model.js');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

Model.makeConnection();

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({storage: storage});

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


app.post('/add-pet',  upload.single('photo'), async function(req, res) {
    const pet = {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        birth_date: req.body.birth_date,
        photo: req.file ? 'uploads/' + req.file.filename : null
    }

    await Model.addPet(pet);
    res.redirect('/');
});

app.get('/delete-form', async function(req, res) {
    const petArray = await Model.getAllPets();
    res.render('main_page', { pets: petArray, deletepet: true } );
}); 

app.post('/delete-pet', async function(req, res){
    Model.deletePet(req.body.id);
    res.redirect('/');
});

app.get('/record-page/:pet_id', async function(req, res){
    pet_id = req.params.pet_id;
    const recordArray = await Model.getRecordsByPetId(pet_id);
    res.render('records-page', {records: recordArray, pet_id: pet_id});
});

app.get('/add-record-form/:pet_id', async function(req, res){
     
    const recordArray = await Model.getRecordsByPetId(req.params.pet_id);
    res.render('records-page', { records: recordArray, addrecord: true, pet_id: req.params.pet_id} );
});


app.post('/add-record', async function(req, res){

    const record = {
        pet_id: req.body.pet_id,
        visit_date: req.body.visit_date,
        visit_type: req.body.visit_type,
        weight: req.body.weight,
        cost: req.body.cost,
        notes: req.body.notes
    }
    await Model.addRecord(record);
    res.redirect('/record-page/' + req.body.pet_id);
});

app.get('/delete-record-form/:pet_id', async function(req, res) {
    recordArray = await Model.getRecordsByPetId(req.params.pet_id);
    res.render('records-page', {records: recordArray, deleterecord: true, pet_id: req.params.pet_id});
}); 

app.post('/delete-record/:pet_id', async function(req, res){
    await Model.deleteRecord(req.body.id);
    recordArray = await Model.getRecordsByPetId(req.params.pet_id);
    res.render('records-page', {records: recordArray, pet_id: req.params.pet_id });
});

app.get('/update-record-form/:pet_id', async function(req, res){
    const pet_id = req.params.pet_id;
    const recordArray = await Model.getRecordsByPetId(pet_id);
    res.render('records-page', { records: recordArray, updaterecord: true, pet_id: pet_id });
});

app.post('/update-record', async function(req, res){
    const record = {
        id: req.body.id,
        visit_date: req.body.visit_date,
        visit_type: req.body.visit_type,
        weight: req.body.weight,
        cost: req.body.cost,
        notes: req.body.notes
    }
    await Model.updateRecord(record);
    res.redirect('/record-page/' + req.body.pet_id);
});




app.listen(3000, () => { console.log("Server listening on port 3000")});