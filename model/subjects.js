let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SubjectSchema = Schema({
    libelle: String,
    prof: String,
    img_prof: String,
    img_matiere: String,
});

module.exports = mongoose.model('Subject', SubjectSchema, 'subjects');