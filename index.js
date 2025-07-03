const express = require('express');
const app = express();

//Import JSON data
const pokemonData = require('./pokemon.json');


const PORT = 3000;


app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('Welcome to the Pokémon API!');
    console.log('Root endpoint accessed');
});
// Get all pokémon
app.get('/pokemon', (req, res) =>{
 res.json(pokemonData);
    console.log('All Pokémon data sent');
});
// Get a specific pokémon by ID
app.get('/pokemon/:id', (req, res) => {
    const pokemon = pokemonData.find(p => p.id === parseInt(req.params.id));
    if (pokemon) {
        res.json(pokemon);
        console.log(`Pokémon with ID ${req.params.id} sent`);
    } else {
        res.status(404).send('Pokémon not found');
        console.log(`Pokémon with ID ${req.params.id} not found`);
    }
});
// Search for pokémon by name
app.get('/search', (req, res) => {
    const name = req.query.name.toLowerCase();
    const results = pokemonData.filter(p => p.name.toLowerCase().includes(name));
    res.json(results);
    console.log(`Search for Pokémon with name "${name}" sent`);
});
// Add a new pokémon
app.post('/pokemon', (req, res) => {
    const newPokemon = req.body;
    pokemonData.push(newPokemon);
    res.status(201).json(newPokemon);
    console.log(`New Pokémon added: ${JSON.stringify(newPokemon)}`);
});


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});