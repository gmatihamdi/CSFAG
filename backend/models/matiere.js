const mongoose = require('mongoose');
const Schema = mongoose.Schema;

matiereSchema =new Schema({


    codeMatiere:  String ,
    libMatiere:  String,
    coifMatiere: String,
    seuilMatiere:String,
    niveauMatiere: String,
    specialiteMatiere:String,
    Nbreheures:String,
    

})
module.exports = mongoose.model('Matiere', matiereSchema);