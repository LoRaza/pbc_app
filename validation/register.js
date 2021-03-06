const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // On vérifie que chaque champ(info du membre) n'est pas vide
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Votre nom doit avoir entre 2 et 30 caractère.';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Nom requis.';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email requis.';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email erroné.';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Mot de passe requis.';
    }

    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Le mot de passe doit contenir au moins 6 caractères.'
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'La confirmation du mot de passe est requise.';
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Confirmation de mot de passe erronée.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}