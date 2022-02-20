const express = require('express')
const Matiere = require('../models/matiere')
const router = express.Router()


router.get('/',(req,res)=>{
    Matiere.find({},(err,data)=>{
        res.json(data)
    })
})

router.route('/edit/:id').get((req, res) => {
    Matiere.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

router.delete('/:id',async(req,res)=>{
    await Matiere.findByIdAndDelete(req.params.id)
    res.json({'message':'deleted'})
})



router.post('/',async(req,res)=>{

  let  Matierexiste= await Matiere.findOne({codeMatiere:req.body.codeMatiere,
    specialiteMatiere:req.body.specialiteMatiere });
  // console.log(spcexiste)
   if (Matierexiste){
     return res.status(400).send('That user already exisits!');   
   }
   else{
    matiere=new Matiere({
        codeMatiere:req.body.codeMatiere,
        libMatiere:req.body.libMatiere,
        Nbreheures:req.body.Nbreheures,
        seuilMatiere:req.body.seuilMatiere,
        niveauMatiere:req.body.niveauMatiere,
      specialiteMatiere:req.body.specialiteMatiere
    })
    matiere.save(()=>{
        res.json(this.matiere)
    })
  }
})
router.put('/:id',async(req,res)=>{
    await Matiere.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message':'updated'})
})
module.exports=router