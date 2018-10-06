const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du schéma
const ProfileSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    companyLogo: {
        type: String
    },
    companyMail: {
        type: String
    },
    website: {
        type: String
    },
    phone: {
        type: String,
    },
    // Compétences au palet 
    skills: {
        type: [String]
    },
    social: {
        youtube: {
          type: String
        },
        twitter: {
          type: String
        },
        facebook: {
          type: String
        },
        linkedin: {
          type: String
        },
        instagram: {
          type: String
        }
      },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);