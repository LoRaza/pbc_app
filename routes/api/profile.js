const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Chargement de la validation
const validateProfileInput = require('../../validation/profile');

// Chargement du module Profile
const Profile = require('../../models/Profile');

// Chargement du module User
const User = require('../../models/User');

// @route   GET api/profil/test
// @dsc     Test profil route
// @access  Private
router.get('/test', (req, res) => res.json({msg: "Profil Works"}));


// @route   GET api/profile/
// @dsc     Prends le profil utilisateur connecté
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'Il n\'y a pas de compte pour cet utilisateur';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
  
    Profile.find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }
  
        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
  });
  

// @route   GET api/profile/handle/:handle
// @dsc     Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'email', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'Il n\'y a pas de profil pour cet utilisateur';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};
  
    Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
  
        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({ profile: 'There is no profile for this user' })
      );
  });

// @route   POST api/profile/test
// @dsc     Création ou édition du compte utilisateur
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);
    // Check validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.firstname) profileFields.firstname = req.body.firstname;
    if(req.body.lastname) profileFields.lastname = req.body.lastname;
    if(req.body.work) profileFields.work = req.body.work;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.companyLogo) profileFields.companyLogo = req.body.companyLogo;
    if(req.body.companyMail) profileFields.companyMail = req.body.companyMail;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.phone) profileFields.phone = req.body.phone;

    // Skills - Split into array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'email', 'avatar'])
    .then(profile => {
        if(profile) {
            // Update
            Profile.findOneAndUpdate( 
                { user: req.user.id}, 
                { $set: profileFields }, 
                { new: true }
            ).then(profile => res.json(profile));
        } else {
            // Create

            // Check if handle exists
            Profile.findOne({ handle: profileFields.handle }).then(profile => {
                if(profile) {
                    errors.handle = 'That handle already exists';
                    res.status(400).json(errors);
                }
            
            // Save profile
            new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    });
});

module.exports = router;