
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;
   
  sectionSchema =new Schema({

       codeSection:  String ,
       codePromotion:  {type:String,
        ref:"Promotion"},
       libSection:  String,
       codeSpecialite:  {type:String,
        ref:"Specialite"}, 
       debutSection:  Date, 
       finSection:  Date,
       codeDiplome:  String,
       groupeSection:  String,  
   })
   module.exports = mongoose.model('Section', sectionSchema);