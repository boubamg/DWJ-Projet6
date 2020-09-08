require('dotenv').config();
const User = require("../models/User");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    
    let emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/

    if (emailRegex.test(email)) {
        if (password.length > 8) {

            bcrypt.hash(password, 10)
            .then(hash => {
                const user = new User({
                    email : email,
                    password : hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch((err) => res.status(400).json({err}))
            })
            .catch(err => res.status(500).json({err}));

            } else {
            return res.status(401).json({ message : "Le mot de passe doit contenir au moins 8 caractères"})
        }
    } else {
        return res.status(400).json({ message : "Email incorrect"});
    }
}

exports.login = (req, res) => {
    User.findOne({email : req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({ error: "Utilisateur non trouvé... " })
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({ error: "Mot de passe incorrect..."})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.TOKEN,
                    { expiresIn: '24h' })
            });
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}