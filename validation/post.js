const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Vous avez oublié ce que vous vouliez dire ?';
  }

  if(!Validator.isLength(data.text, { min: 2, max: 300 })) {
      errors.text = 'Votre message doit comporter entre 2 et 300 caractères';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
