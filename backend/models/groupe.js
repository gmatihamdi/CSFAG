
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;
   
  groupeSchema =new Schema({

       codeGroupe:  String ,
       codePromotion:  {type:String,
        ref:"Promotion"},
       libCompetence:  String,
       codeSection:  {type:String,
        ref:"Section"}, 
      
       
   })
   module.exports = mongoose.model('Groupe', groupeSchema);