const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'L\'email est erroné';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email requis';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Mot de passe requis';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
