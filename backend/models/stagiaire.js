const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 stagiaireSchema=new Schema({
    cinStagiaire:String,
    nomStagiaireFr: String,
    nomStagiaireAr: String,
    sexe: String,
    Lieunaissance: String,
    etatdossier: String,
    datenaissanceStag:Date,
    adressStagiaire: String,
    telStagiaire: String,
    niveauScolaire: String,
    emailstagiaire: String,
    specialiteStagiaire: String,
    groupeStagiaire: String,
    codePromotion:  {type:String,
        ref:"Promotion"},
    codeSection:  {type:String,
        ref:"Section"}, 

      
})
module.exports = mongoose.model('Stagiaire', stagiaireSchema);