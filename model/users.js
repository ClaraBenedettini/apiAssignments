let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UsersSchema = Schema({
    nom: String,
    prenom: String,
    login: String,
    mdp: String,
    role: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Users', UsersSchema, 'users');