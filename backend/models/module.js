const mongoose = require('mongoose');
const Schema = mongoose.Schema;

moduleSchema =new Schema({

   
    codeModule: String,
  
    libModule: String,
   
    coifModule: String,
    
    seuilModule:String,
  
    niveauModule: String,
   
    //specialiteModule: {  type: String,
      //  ref: 'Specialite'
 
  //  }

})
module.exports = mongoose.model('Module', moduleSchema);