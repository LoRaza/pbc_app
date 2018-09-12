const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Chargement du User Model
const User = require('../../models/User');

// @route   GET api/users/test
// @dsc     Test users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));


// @route   POST api/users/register
// @dsc     Enregistrement d'un membre
// @access  Public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({ email: 'L\'email existe déjà' });
            } else {
                // On définit une image d'avatar par défaut lors de la création du profil
                const avatar = gravatar.url(req.body.email, {
                    s: '200',   // size
                    r: 'pg',    // rating
                    d: 'mm'     // default
                });

                const newUser = new User ({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar
                });
                
                // On crypte le mot de passe avec bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        });
});

// @route   POST api/users/login
// @dsc     Connexion d'un membre / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // On trouve le User par son email
    User.findOne({ email} ).then(user => {
            // On vérifie s'il le User existe
            if(!user) {
                return res.status(404).json({ email: 'Adresse e-mail inconnu' });
            }

            // On vérifie le password
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch) {
                    // Authentification réussie
                    const payload = { id: user.id, name: user.name, avatar: user.avatar }; // On crée le payload JWT

                    // Sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 7200 },
                        (err, token) => {
                            res.json({
                                sucess: true,
                                token: 'Bearer ' + token
                            });
                    });
                } else {
                    return res.status(400).json({ password: 'Mot de passe incorrect'});
                }
        });
    });
});


module.exports = router;