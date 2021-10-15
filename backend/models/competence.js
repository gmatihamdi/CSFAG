
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;
   
  competenceSchema =new Schema({

       codeCompetence:  String ,
       codePromotion:  {type:String,
        ref:"Promotion"},
       libCompetence:  String,
       codeSection:  {type:String,
        ref:"Section"}, 
        codeSpecialite:  {type:String,
            ref:"Specialite"}, 
            codeMatiere:  {type:String,
            ref:"Matiere"},
       
   })
   module.exports = mongoose.model('Competence', competenceSchema);