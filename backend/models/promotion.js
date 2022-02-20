
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;
   
  promotionSchema =new Schema({

       codePromotion:  String ,
       libPromotionFr:  String,
       libPromotionAr:  String,
       debutPromotion:  String, 
       finPromotion:  String,
       capacitePromotion:  String,  
   })
   module.exports = mongoose.model('Promotion', promotionSchema);