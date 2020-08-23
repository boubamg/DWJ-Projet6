const express = require('express');
const mongoose = require('mongoose');

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

app.use((req,res) => {
    res.json({mesage : 'Votre requête a bien été reçue.'})
});

module.exports = app;