const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// Chargement des validateurs d'entrées
const valideRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

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
    const { errors, isValid } = valideRegisterInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                errors.email = 'L\'email existe déjà'
                return res.status(400).json(errors);
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
                    isAdmin: req.body.isAdmin,
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
    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        errors.email = 'Utilisateur non trouvé';
        return res.status(404).json(errors);
      }
  
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar, isAdmin: user.isAdmin }; // Create JWT Payload
  
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Mot de passe erroné';
          return res.status(400).json(errors);
        }
      });
    });
  });

// @route   GET api/users/current
// @dsc     Renvoi le membre actuel
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }),
    (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});



module.exports = router;