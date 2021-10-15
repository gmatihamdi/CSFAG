const mongoose = require('mongoose');
const Schema = mongoose.Schema;

specialiteSchema =new Schema({


    codeSpecialite:  String ,
    libSpecialite:  String,
    libSpecialiteAr:  String,
    typeSpecialite:  String,
    dureeSpecialite:  String,
    diplomeSpecialite:  String,




    

})
module.exports = mongoose.model('Specialite', specialiteSchema);