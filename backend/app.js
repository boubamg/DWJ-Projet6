const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// import models
const Sauce = require('./models/Sauce');

const app = express();

// Database Connection
mongoose.connect(
    "mongodb+srv://boubamg9:Annete215@cluster0.i0ghu.mongodb.net/Cluster0?retryWrites=true&w=majority", 
{ useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log("Connexion à mongoDB réussie"))
.catch(() => console.log("Echec de connexion à mongoDB"));


// Request authorization
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// Sauce Route

app.use('/api/sauces', (req, res) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => res.status(400).json({ err }));
});

app.get('/api/sauces/:id', (req, res) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(err => res.status(400).json({ err }));
});

app.post('/api/sauces', (req, res) => {
    const sauceParsed = JSON.parse(req.body.sauce);
    delete sauceParsed._id;
    const sauce = new Sauce({
        ...sauceParsed,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce ajoutée'}))
    .catch(err => res.status(400).json({err}));
});

app.use((req,res) => {
    res.json({mesage : 'Votre requête a bien été reçue.'})
});

module.exports = app;