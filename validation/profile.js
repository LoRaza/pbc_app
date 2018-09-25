const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.work = !isEmpty(data.work) ? data.work : '';
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
  }

  if(Validator.isEmpty(data.handle)) {
      errors.handle = 'Profile handle is required';
  }

  if(Validator.isEmpty(data.work)) {
      errors.work = 'Vous devez indiquer votre profession';
  }

  if(Validator.isEmpty(data.firstname)) {
    errors.firstname = 'Prénom requis';
  }  
  
  if(Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Nom requis';
  }
  
  if(!isEmpty(data.website)) {
    if(!Validator.isURL(data.website)) {
        errors.website = 'URL invalide';
    }
  }
  if(!isEmpty(data.companyMail)) {
    if(!Validator.isEmail(data.companyMail)) {
        errors.companyMail = 'Adresse mail invalide';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
