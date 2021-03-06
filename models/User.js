const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du Schema User
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = User = mongoose.model('users', UserSchema);