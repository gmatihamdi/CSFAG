const express = require('express')
const Competence = require('../models/competence')
const router = express.Router()


router.get('/',(req,res)=>{
  Competence.find({})
    .populate([
         
      {
      path: 'codePromotion',
      model: 'Promotion'
  },
  {
    path: 'codeSection',
    model: 'Section'
},
   {
      path: 'codeSpecialite',
      model: 'Specialite'
   }
  ,
   {
      path: 'codeMatiere',
      model: 'Matiere'
  }])
    
    
  .exec(function (err, data) {
      res.json(data)
    })
  })

router.route('/edit/:id').get((req, res) => {
    Competence.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

router.delete('/:id',async(req,res)=>{
    await Competence.findByIdAndDelete(req.params.id)
    res.json({'message':'deleted'})
})

router.post('/',async(req,res)=>{

  let  compexiste= await Competence.findOne({
    codeMatiere:req.body.codeMatiere,
    codeSection:req.body.codeSection,

  
  });

  // console.log(spcexiste)
   
   if (compexiste){
     return res.status(400).send('That user already exisits!');
    
   }
   else{

    competence=new Competence({
        codeCompetence:req.body.codeCompetence,
        codeSection:req.body.codeSection,
        codePromotion:req.body.codePromotion,
        codeSpecialite:req.body.codeSpecialite,
        codeMatiere:req.body.codeMatiere,

    })
    competence.save(()=>{
        res.json(this.section)
    })
  }
})
router.put('/:id',async(req,res)=>{
    await Competence.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})
module.exports=router