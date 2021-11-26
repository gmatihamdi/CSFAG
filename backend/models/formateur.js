const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 formateurSchema=new Schema({
    cinFormateur:String,
    nomFormateurFr: String,
    nomFormateurAr: String,
    sexe: String,
    Lieunaissance: String,
    etatFormateur: String,
    datenaiFormateur:Date,
    adressFormateur: String,
    telFormateur: String,
    emailFormateur: String,

      
})
module.exports = mongoose.model('Formateur', formateurSchema);