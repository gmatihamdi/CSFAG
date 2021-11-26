const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 noteSchema =new Schema({

    noteexam:String,
    stagiaireNote: {type:String,
    ref:"Stagiaire"},
    moduleNote: {type:String,
    ref:"Matiere"},
    FormateurNote: {type:String,
        ref:"Formateur"},

})
module.exports = mongoose.model('Note', noteSchema);