let mongoose = require('mongoose');
var page = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    nom: String,
    dateLimite: Date,
    etat: Boolean,
    matiere: String,
    note: Number,
    remarque: String,
    nomEleve: String,
    formationConcernee: String,
});

AssignmentSchema.plugin(page);
AssignmentSchema.index({ nom: "text" });
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema, 'assignments');
