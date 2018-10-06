const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.work = !isEmpty(data.work) ? data.work : '';
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Votre nom d\'utilisateur doit contenir entre 2 et 40 caractères';
  }

  if(Validator.isEmpty(data.handle)) {
      errors.handle = 'Nom d\'utilisateur requis';
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
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'URL invalide';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'URL invalide';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'URL invalide';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'URL invalide';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'URL invalide';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
