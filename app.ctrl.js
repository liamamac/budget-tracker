const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');

const Model = require('./app.model.js');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

Model.makeConnection();

app.get('/', async function(req, res) {
    
    const petArray = await Model.getAllPets();
    console.log(petArray);
    res.render('main_page', { pets: petArray } );
});


app.listen(3000, () => { console.log("Server listening on port 3000")});