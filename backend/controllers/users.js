const User = require("../models/User");
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email : req.body.email,
            password : hash
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch((err) => res.status(400).json({err}))
    })
    .catch(err => res.status(500).json({err}));
}

exports.login = (req, res) => {
    
}