require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

const saucesRoute = require('./routes/sauce');
const usersRoute = require("./routes/users");

const app = express();

// Database Connection
mongoose.connect(
    process.env.MONGODBCONNECTION, 
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() => console.log("Connexion à mongoDB réussie"))
.catch(() => console.log("Echec de connexion à mongoDB"));


app.use(helmet());

// Request authorization
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Route
app.use('/api/sauces', saucesRoute);
app.use('/api/auth', usersRoute);

module.exports = app;